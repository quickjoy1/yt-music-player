function playSong() {
    const query = document.getElementById('yt-url').value;

    fetch('https://fefa1a5a8326.ngrok-free.app/', {  // ✅ fixed this line
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

            // Set YouTube thumbnail as background
            const bg = document.getElementById('bg-wrapper');
            const imageUrl = `https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg`;
            bg.style.backgroundImage = `url(${imageUrl})`;
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Network error or backend not responding.");
    });
}
