document.addEventListener('DOMContentLoaded', function() {

    // --- Playlist Panel Logic ---
    const playlistIcon = document.getElementById('playlist-icon');
    const playlistPanel = document.getElementById('playlist-panel');

    if (playlistIcon && playlistPanel) {
        playlistIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            const isVisible = playlistPanel.style.display === 'block';
            playlistPanel.style.display = isVisible ? 'none' : 'block';
        });

        document.addEventListener('click', function(event) {
            if (playlistPanel.style.display === 'block' && !playlistPanel.contains(event.target) && event.target !== playlistIcon) {
                playlistPanel.style.display = 'none';
            }
        });
    }

    // --- About Section Toggle Logic ---
    const toggleTitles = document.querySelectorAll('.toggle-title');
    toggleTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            if (content && content.classList.contains('toggle-content')) {
                const isVisible = content.style.display === 'block';
                content.style.display = isVisible ? 'none' : 'block';
                title.classList.toggle('open', !isVisible);
            }
        });
    });

    // --- Playlist Music Logic ---
    const audioPlayer = document.getElementById('audio-player');
    const playlistItems = document.querySelectorAll('#playlist-list li');

    if (audioPlayer && playlistItems.length > 0) {
        playlistItems.forEach(item => {
            item.addEventListener('click', function() {
                const src = this.getAttribute('data-src');
                audioPlayer.src = src;
                audioPlayer.play();
                playlistItems.forEach(i => i.classList.remove('playing'));
                this.classList.add('playing');
            });
        });

        audioPlayer.addEventListener('ended', function() {
            let currentPlaying = document.querySelector('#playlist-list li.playing');
            let nextSibling = currentPlaying ? currentPlaying.nextElementSibling : null;
            if (nextSibling) {
                nextSibling.click();
            } else { 
                playlistItems[0].click();
            }
        });
    }

    // --- Project Grid & Modal Logic ---
    const projectGrid = document.getElementById('project-grid');
    const projectModalElement = document.getElementById('project-modal');
    const projectModal = new bootstrap.Modal(projectModalElement);
    const modalBody = projectModalElement.querySelector('.modal-body');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    let currentProjectIndex = 0;

    function getThumbnail(project) {
        if (project.thumbnail) return project.thumbnail;
        if (project.type === 'image') return project.href;
        return 'logo.png'; // Default placeholder
    }

    function showProject(index) {
        if (index < 0 || index >= projects.length) return;
        currentProjectIndex = index;
        const project = projects[currentProjectIndex];
        
        modalBody.innerHTML = ''; // Clear previous content
        loadProjectContent(project, modalBody);

        // Update button visibility
        prevBtn.style.display = currentProjectIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentProjectIndex === projects.length - 1 ? 'none' : 'block';
    }

    if (projectGrid) {
        projects.forEach((project, index) => {
            const thumbSrc = getThumbnail(project);
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6';

            const thumbnail = document.createElement('div');
            thumbnail.className = 'project-thumbnail';
            thumbnail.setAttribute('data-index', index);

            const img = document.createElement('img');
            img.src = thumbSrc;
            img.alt = project.name;

            thumbnail.appendChild(img);
            col.appendChild(thumbnail);
            projectGrid.appendChild(col);
        });

        projectGrid.addEventListener('click', function(e){
            const thumbnail = e.target.closest('.project-thumbnail');
            if(thumbnail){
                const projectIndex = parseInt(thumbnail.getAttribute('data-index'), 10);
                showProject(projectIndex);
                projectModal.show();
            }
        });
    }

    prevBtn.addEventListener('click', () => showProject(currentProjectIndex - 1));
    nextBtn.addEventListener('click', () => showProject(currentProjectIndex + 1));

    function loadProjectContent(project, container) {
        const type = project.type;

        if (type === 'html' || type === 'pdf') {
            const iframe = document.createElement('iframe');
            iframe.style.width = '67vw';
            
            iframe.style.border = 'none';
            iframe.src = project.href;
            container.appendChild(iframe);
        } else if (type === 'image') {
            const image = document.createElement('img');
            image.src = project.href;
            container.appendChild(image);
        } else if (type === 'gallery') {
            try {
                const media = JSON.parse(project.media);
                if (media && media.length > 0) {
                    media.forEach(item => {
                        if (item.type === 'video') {
                            const video = document.createElement('video');
                            video.src = item.src;
                            video.controls = true;
                            video.autoplay = true; // Autoplay videos in the gallery
                            container.appendChild(video);
                        } else if (item.type === 'youtube') {
                            const iframe = document.createElement('iframe');
                            iframe.src = item.src;
                            iframe.style.width = '67vw';
                            
                            iframe.setAttribute('frameborder', '0');
                            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                            iframe.setAttribute('allowfullscreen', '');
                            container.appendChild(iframe);
                        } else if (item.type === 'image') {
                            const image = document.createElement('img');
                            image.src = item.src;
                            container.appendChild(image);
                        }
                    });
                }
            } catch (e) {
                container.innerHTML = '<p style="color:white; font-size: 1.5rem;">Error loading project media.</p>';
            }
        }
    }

    projectModalElement.addEventListener('hidden.bs.modal', function () {
        modalBody.innerHTML = '';
    });
});