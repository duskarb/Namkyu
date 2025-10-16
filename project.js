document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            title: 'Eyes V2',
            type: 'html',
            src: 'eyes_v2.html',
        },
        {
            title: 'Infographic Sketch Guide',
            type: 'image',
            src: 'infographic_sketguide.jpg',
        },
        {
            title: 'Loading Page',
            type: 'html',
            src: 'loading_page.html',
        },
        {
            title: 'Project 2',
            type: 'video',
            src: 'Project2_여남규.mp4',
        },
        {
            title: 'TD LOVE 1',
            type: 'video',
            src: 'TD_LOV3_1.mov',
        },
        {
            title: 'TD LOVE 2',
            type: 'video',
            src: 'TD_LOV3_2.mp4',
        },
        {
            title: 'Twist The Plot',
            type: 'video',
            src: 'twist_the_plot.mp4',
        },
        {
            title: 'Eocheoguni Jangbyeok',
            type: 'gallery',
            images: ['어처구니 장벽/1.png', '어처구니 장벽/2.png', '어처구니 장벽/3.png', '어처구니 장벽/4.png']
        },
        {
            title: 'Give Me Love',
            type: 'image',
            src: 'Give_me_love/스크린샷 2025-09-16 오후 8.20.07.png',
        },
        {
            title: 'Mobility ORCA',
            type: 'gallery',
            images: ['mobility_ORCA/1.jpg', 'mobility_ORCA/2.jpg', 'mobility_ORCA/3.jpg', 'mobility_ORCA/4.jpg', 'mobility_ORCA/5.jpg', 'mobility_ORCA/6.jpg']
        },
        {
            title: 'TIME STICK',
            type: 'gallery',
            images: ['TIME STICK/1.jpg', 'TIME STICK/2.jpg', 'TIME STICK/3.jpg', 'TIME STICK/4.jpg', 'TIME STICK/5.jpg']
        }
    ];

    const projectTitleElement = document.getElementById('project-title');
    const projectContentElement = document.getElementById('project-content');

    const urlParams = new URLSearchParams(window.location.search);
    const projectTitle = urlParams.get('project');

    const project = projects.find(p => p.title === projectTitle);

    if (project) {
        projectTitleElement.textContent = project.title;

        if (project.type === 'image') {
            const image = document.createElement('img');
            image.src = project.src;
            image.className = 'img-fluid';
            projectContentElement.appendChild(image);
        } else if (project.type === 'video') {
            const video = document.createElement('video');
            video.src = project.src;
            video.controls = true;
            video.autoplay = true;
            video.className = 'img-fluid';
            projectContentElement.appendChild(video);
            if (project.src.endsWith('.mov')) {
                const warning = document.createElement('p');
                warning.className = 'text-warning mt-2';
                warning.textContent = '.mov files might not be supported in all browsers. Consider converting to MP4 for better compatibility.';
                projectContentElement.appendChild(warning);
            }
        } else if (project.type === 'html') {
            const iframe = document.createElement('iframe');
            iframe.src = project.src;
            iframe.style.width = '100%';
            iframe.style.height = '80vh';
            iframe.style.border = 'none';
            projectContentElement.appendChild(iframe);
        } else if (project.type === 'gallery') {
            project.images.forEach(imageSrc => {
                const image = document.createElement('img');
                image.src = imageSrc;
                image.className = 'img-fluid mb-3';
                projectContentElement.appendChild(image);
            });
        }
    } else {
        projectTitleElement.textContent = 'Project not found';
    }
});