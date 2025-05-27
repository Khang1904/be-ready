function generatePDF() {
    const info = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        add: document.getElementById("add").value,
        email: document.getElementById("email").value,

        feel: document.getElementById("feel").value,
        temp: document.getElementById("temp").value,
        pulse: document.getElementById("pulse").value,
        bp: `${document.getElementById("sys").value}/${document.getElementById("dias").value}`,
        o2: document.getElementById("o2").value,
        med: document.getElementById("med").value,

        ename: document.getElementById("ename").value,
        ephone: document.getElementById("ephone").value,
    }

    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(26);
    doc.text("Report Information", 20, 20);

    doc.setFontSize(20);
    doc.text("Personal:", 20, 35);

    doc.setFontSize(14);
    doc.text(`Name: ${info.name}`, 20, 45);
    doc.text(`Phone: ${info.phone}`, 20, 55);
    doc.text(`Age: ${info.age}`, 20, 65);
    doc.text(`Gender: ${info.gender}`, 20, 75);
    doc.text(`Address: ${info.add}`, 20, 85);
    doc.text(`Email: ${info.email}`, 20, 95);

    doc.setFontSize(20);
    doc.text("Health:", 20, 110);

    doc.setFontSize(14);
    doc.text(`Symptoms: ${info.feel}`, 20, 120);
    doc.text(`Temperature: ${info.temp}°C`, 20, 130);
    doc.text(`Pulse: ${info.pulse}bpm`, 20, 140);
    doc.text(`Blood Pressure: ${info.bp}mmHg`, 20, 150);
    doc.text(`Oxygen Level: ${info.o2}%`, 20, 160);
    doc.text(`Medication: ${info.med}`, 20, 170);

    doc.setFontSize(20);
    doc.text("Emergency Contact:", 20, 185);

    doc.setFontSize(14);
    doc.text(`Name: ${info.ename}`, 20, 195);
    doc.text(`Phone: ${info.ephone}`, 20, 205);

    doc.save("report.pdf");
}