from flask import Flask, request, jsonify, render_template
import yt_dlp
from flask_cors import CORS

app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')  # your main page

@app.route('/play.html')
def play():
    return render_template('play.html')  # your second page

def get_audio_url_and_video_id(query):
    ydl_opts = {
        'format': 'bestaudio[ext=m4a]/bestaudio/best',
        'quiet': True,
        'default_search': 'ytsearch1',
        'noplaylist': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(query, download=False)
        if 'entries' in info:
            info = info['entries'][0]

        video_id = info.get('id')
        return info['url'], info.get('title', 'Unknown'), video_id

@app.route('/get-audio', methods=['POST'])
def get_audio():
    data = request.get_json()
    query = data.get('query')

    try:
        audio_url, title, video_id = get_audio_url_and_video_id(query)
        return jsonify({
            'success': True,
            'audio_url': audio_url,
            'title': title,
            'video_id': video_id
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
