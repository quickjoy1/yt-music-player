function playSong() {
    const query = document.getElementById('yt-url').value;

    fetch('http://127.0.0.1:5000/get-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const player = document.getElementById('player');
                player.src = data.audio_url;
                player.play();
                

                document.getElementById('title').innerText = "Now Playing: " + data.title;

                // Set background using video ID
                const bg = document.getElementById('bg-wrapper');
                const imageUrl = `https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg`;
                bg.style.backgroundImage = `url(${imageUrl})`;
            } else {
                alert("Error: " + data.error);
            }

        });

}
