function generateResume() {

    document.getElementById("r_name").innerText =
        document.getElementById("name").value;

    document.getElementById("r_title").innerText =
        document.getElementById("title").value;

    document.getElementById("r_email").innerText =
        document.getElementById("email").value;

    document.getElementById("r_phone").innerText =
        document.getElementById("phone").value;

    document.getElementById("r_about").innerText =
        document.getElementById("about").value;

    document.getElementById("r_education").innerText =
        document.getElementById("education").value;

    document.getElementById("r_experience").innerText =
        document.getElementById("experience").value;



    let skills = document.getElementById("skills").value.split(",");

    let skillList = document.getElementById("r_skills");

    skillList.innerHTML = "";

    skills.forEach(skill => {

        let li = document.createElement("li");
        li.innerText = skill.trim();
        skillList.appendChild(li);

    });

}



function downloadPDF() {

    const element = document.getElementById("resume");

    html2pdf()
        .from(element)
        .save("resume.pdf");

}