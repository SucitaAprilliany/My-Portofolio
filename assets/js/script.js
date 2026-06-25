$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // emailjs to mail contact form data
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });

});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | SUCITA";
        $("#favicon").attr("href", "assets/images/favicon.jpeg");
    } else {
        document.title = "Portfolio | SUCITA";
        $("#favicon").attr("href", "assets/images/favicon.jpeg");
    }
});

// typed js effect starts
var typed = new Typed(".typing-text", {
    strings: ["IT NSA", "IT Infrastructur", "Administrator"],
    loop: true,
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 500,
});

// Fetch Data Function
async function fetchData(type = "skills") {
    let response;
    if (type === "skills") {
        response = await fetch("skills.json");
    } else {
        response = await fetch("projects.json");
    }
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
          <div class="info">
            <img src="${skill.icon}" alt="${skill.name}" onerror="this.src='./assets/images/skills/default.png';" />
            <span>${skill.name}</span>
          </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#projectsContainer");
    let certificationContainer = document.querySelector("#certificationContainer");
    
    let projectHTML = "";
    let certHTML = "";

    projects.forEach(project => {
        let cardHTML = `
        <div class="box tilt">
          <img draggable="false" src="./assets/images/projects/${project.image}.${project.ext}" alt="project" style="width: 100%; height: 200px; object-fit: cover;" />
          <div class="content">
            <div class="tag">
                <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>`;

        if (project.category === "work") {
            projectHTML += cardHTML;
        } else if (project.category === "experience") {
            certHTML += cardHTML;
        }
    });

    if (projectsContainer) projectsContainer.innerHTML = projectHTML;
    if (certificationContainer) certificationContainer.innerHTML = certHTML;

    // Perbaikan inisialisasi VanillaTilt yang aman
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }

    // ScrollReveal untuk project box
    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });
        srtop.reveal('.work .box', { interval: 200 });
    }
}

// Eksekusi Fetching Data
fetchData("skills").then(data => {
    showSkills(data);
}).catch(err => console.error("Gagal memuat skills:", err));

fetchData("projects").then(data => {
    showProjects(data);
}).catch(err => console.error("Gagal memuat projects:", err));

// Scroll Reveal Animasi Global
if (typeof ScrollReveal !== 'undefined') {
    const srtopGlobal = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtopGlobal.reveal('.home .content h3', { delay: 200 });
    srtopGlobal.reveal('.home .content p', { delay: 200 });
    srtopGlobal.reveal('.home .content .btn', { delay: 200 });
    srtopGlobal.reveal('.home .image', { delay: 400 });
    srtopGlobal.reveal('.about .content h3', { delay: 200 });
    srtopGlobal.reveal('.about .content p', { delay: 200 });
    srtopGlobal.reveal('.education .box', { interval: 200 });
}
