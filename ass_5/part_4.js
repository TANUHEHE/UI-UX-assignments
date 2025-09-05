let student = {
  name: "Alice",
  age: 20,
  grade: "B"
};

// Add new property
student.class = "CS101";

// Update grade
student.grade = "A";

// Display info
console.log("Student Info:");
for (let key in student) {
  console.log(key + ":", student[key]);
}
