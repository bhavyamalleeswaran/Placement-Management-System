const API = "http://127.0.0.1:8000/api";

// ======================================================
// STUDENTS
// ======================================================

async function loadStudents() {
    const res = await fetch(`${API}/students/`);
    const data = await res.json();

    let html = `
        <table border="1" cellpadding="6">
        <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th>
            <th>Department</th><th>Year</th><th>CGPA</th><th>Skills</th><th>Actions</th>
        </tr>
    `;

    data.forEach(s => {
        html += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.email}</td>
                <td>${s.phone}</td>
                <td>${s.department}</td>
                <td>${s.year}</td>
                <td>${s.cgpa}</td>
                <td>${s.skills}</td>
                <td>
                    <button onclick='editStudent(${JSON.stringify(s)})'>Edit</button>
                    <button onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";
    document.getElementById("students").innerHTML = html;

    populateStudentDropdown(data);
}

function populateStudentDropdown(students) {
    const select = document.getElementById("p_student");
    if (!select) return;

    const currentValue = select.value;
    select.innerHTML = '<option value="">Select Student</option>';

    students.forEach(s => {
        const option = document.createElement("option");
        option.value = s.id;
        option.textContent = `${s.id} - ${s.name}`;
        select.appendChild(option);
    });

    if (currentValue) select.value = currentValue;
}

async function saveStudent(event) {
    event.preventDefault();

    const id = document.getElementById("s_id").value;
    const payload = {
        name: document.getElementById("s_name").value,
        email: document.getElementById("s_email").value,
        phone: document.getElementById("s_phone").value,
        department: document.getElementById("s_department").value,
        year: document.getElementById("s_year").value,
        cgpa: document.getElementById("s_cgpa").value,
        skills: document.getElementById("s_skills").value,
    };

    if (id) {
        // Update existing student
        await fetch(`${API}/students/${id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } else {
        // Create new student
        await fetch(`${API}/students/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    }

    resetStudentForm();
    loadStudents();
}

function editStudent(student) {
    document.getElementById("s_id").value = student.id;
    document.getElementById("s_name").value = student.name;
    document.getElementById("s_email").value = student.email;
    document.getElementById("s_phone").value = student.phone;
    document.getElementById("s_department").value = student.department;
    document.getElementById("s_year").value = student.year;
    document.getElementById("s_cgpa").value = student.cgpa;
    document.getElementById("s_skills").value = student.skills;

    document.getElementById("s_submitBtn").textContent = "Update Student";
    document.getElementById("s_cancelBtn").style.display = "inline-block";
}

function resetStudentForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("s_id").value = "";
    document.getElementById("s_submitBtn").textContent = "Add Student";
    document.getElementById("s_cancelBtn").style.display = "none";
}

async function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;
    await fetch(`${API}/students/${id}/`, { method: "DELETE" });
    loadStudents();
}

// ======================================================
// COMPANIES
// ======================================================

async function loadCompanies() {
    const res = await fetch(`${API}/companies/`);
    const data = await res.json();

    let html = `
        <table border="1" cellpadding="6">
        <tr>
            <th>ID</th><th>Company Name</th><th>Location</th><th>Job Role</th>
            <th>Package</th><th>Eligibility CGPA</th><th>Actions</th>
        </tr>
    `;

    data.forEach(c => {
        html += `
            <tr>
                <td>${c.id}</td>
                <td>${c.company_name ?? c.name}</td>
                <td>${c.location}</td>
                <td>${c.job_role}</td>
                <td>${c.package}</td>
                <td>${c.eligibility_cgpa}</td>
                <td>
                    <button onclick='editCompany(${JSON.stringify(c)})'>Edit</button>
                    <button onclick="deleteCompany(${c.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";
    document.getElementById("companies").innerHTML = html;

    populateCompanyDropdown(data);
}

function populateCompanyDropdown(companies) {
    const select = document.getElementById("p_company");
    if (!select) return;

    const currentValue = select.value;
    select.innerHTML = '<option value="">Select Company</option>';

    companies.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = `${c.id} - ${c.company_name ?? c.name}`;
        select.appendChild(option);
    });

    if (currentValue) select.value = currentValue;
}

async function saveCompany(event) {
    event.preventDefault();

    const id = document.getElementById("c_id").value;
    const payload = {
        company_name: document.getElementById("c_name").value,
        location: document.getElementById("c_location").value,
        job_role: document.getElementById("c_role").value,
        package: document.getElementById("c_package").value,
        eligibility_cgpa: document.getElementById("c_cgpa").value,
    };

    if (id) {
        await fetch(`${API}/companies/${id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } else {
        await fetch(`${API}/companies/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    }

    resetCompanyForm();
    loadCompanies();
}

function editCompany(company) {
    document.getElementById("c_id").value = company.id;
    document.getElementById("c_name").value = company.company_name ?? company.name;
    document.getElementById("c_location").value = company.location;
    document.getElementById("c_role").value = company.job_role;
    document.getElementById("c_package").value = company.package;
    document.getElementById("c_cgpa").value = company.eligibility_cgpa;

    document.getElementById("c_submitBtn").textContent = "Update Company";
    document.getElementById("c_cancelBtn").style.display = "inline-block";
}

function resetCompanyForm() {
    document.getElementById("companyForm").reset();
    document.getElementById("c_id").value = "";
    document.getElementById("c_submitBtn").textContent = "Add Company";
    document.getElementById("c_cancelBtn").style.display = "none";
}

async function deleteCompany(id) {
    if (!confirm("Delete this company?")) return;
    await fetch(`${API}/companies/${id}/`, { method: "DELETE" });
    loadCompanies();
}

// ======================================================
// PLACEMENTS
// ======================================================

async function loadPlacements() {
    const res = await fetch(`${API}/placements/`);
    const data = await res.json();

    let html = `
        <table border="1" cellpadding="6">
        <tr>
            <th>ID</th><th>Placement Date</th><th>Status</th>
            <th>Student</th><th>Company</th><th>Actions</th>
        </tr>
    `;

    data.forEach(p => {
        html += `
            <tr>
                <td>${p.id}</td>
                <td>${p.placement_date}</td>
                <td>${p.status}</td>
                <td>${p.student}</td>
                <td>${p.company}</td>
                <td>
                    <button onclick='editPlacement(${JSON.stringify(p)})'>Edit</button>
                    <button onclick="deletePlacement(${p.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";
    document.getElementById("placements").innerHTML = html;
}

async function savePlacement(event) {
    event.preventDefault();

    const id = document.getElementById("p_id").value;
    const payload = {
        placement_date: document.getElementById("p_date").value,
        status: document.getElementById("p_status").value,
        student: document.getElementById("p_student").value,
        company: document.getElementById("p_company").value,
    };

    if (id) {
        await fetch(`${API}/placements/${id}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } else {
        await fetch(`${API}/placements/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    }

    resetPlacementForm();
    loadPlacements();
}

function editPlacement(placement) {
    document.getElementById("p_id").value = placement.id;
    document.getElementById("p_date").value = placement.placement_date;
    document.getElementById("p_status").value = placement.status;
    document.getElementById("p_student").value = placement.student;
    document.getElementById("p_company").value = placement.company;

    document.getElementById("p_submitBtn").textContent = "Update Placement";
    document.getElementById("p_cancelBtn").style.display = "inline-block";
}

function resetPlacementForm() {
    document.getElementById("placementForm").reset();
    document.getElementById("p_id").value = "";
    document.getElementById("p_submitBtn").textContent = "Add Placement";
    document.getElementById("p_cancelBtn").style.display = "none";
}

async function deletePlacement(id) {
    if (!confirm("Delete this placement?")) return;
    await fetch(`${API}/placements/${id}/`, { method: "DELETE" });
    loadPlacements();
}

// Load everything on page load
window.onload = function () {
    loadStudents();
    loadCompanies();
    loadPlacements();
};