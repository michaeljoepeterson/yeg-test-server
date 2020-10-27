function totalHours(lessons){
    return lessons.length;
}

function totalStudents(lessons){
    let studentCount = 0;

    for(let i = 0;i < lessons.length;i++){
        let lesson = lessons[i];
        studentCount += lesson.students.length
    }

    return studentCount;
}

function hourBreakdown(lessons){
    const hourMap = {
        0:0,
        1:15,
        2:15,
        3:19,
        4:21,
        5:23,
        6:25,
        7:27,
        8:29,
        9:31,
        10:33,
        11:35,
        12:37
    };

    let hourBreakDown = {};
    let studentBreakDown = {};

    for(let i = 0;i < lessons.length;i++){
        let students = lessons[i].students.length;
        let pay = hourMap[students] || hourMap[students] === 0 ? hourMap[students] : hourMap[12];
        hourBreakDown[pay] = hourBreakDown[pay] ? hourBreakDown[pay] + 1 : 1;
        studentBreakDown[students] = studentBreakDown[students] ? studentBreakDown[students] + 1: 1;
    }

    return [hourBreakDown,studentBreakDown];
}


module.exports = {totalHours,totalStudents,hourBreakdown};