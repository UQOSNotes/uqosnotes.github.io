const fs = require('fs');
const path = require('path');

module.exports = function() {
  const base = path.join(__dirname, '../../public/notes');
  const tree = [];

  if (!fs.existsSync(base)) return tree;

  for (const faculty of fs.readdirSync(base).sort()) {
    const facultyPath = path.join(base, faculty);
    if (!fs.statSync(facultyPath).isDirectory()) continue;

    const schools = [];
    for (const school of fs.readdirSync(facultyPath).sort()) {
      const schoolPath = path.join(facultyPath, school);
      if (!fs.statSync(schoolPath).isDirectory()) continue;

      const courses = [];
      for (const course of fs.readdirSync(schoolPath).sort()) {
        const pdfPath = path.join(schoolPath, course, 'notes.pdf');
        if (fs.existsSync(pdfPath)) {
          courses.push({
            code: course,
            url: `/notes/${faculty}/${school}/${course}/notes.pdf`
          });
        }
      }
      if (courses.length) schools.push({ school, courses });
    }

    if (schools.length) tree.push({ faculty, schools });
  }

  return tree;
};