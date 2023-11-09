function matchmaker(names, data) {
    const [usernamesRow, ...dataRows] = data;
    const usernames = usernamesRow.slice(1);
    const averagePoints = {};
    usernames.forEach((username, index) => {
        let acc = 0;
        let total = 0;
        dataRows.forEach((row) => {
            if (!isNaN(row[index + 1])) {
                acc += parseInt(Number(row[index + 1]));
                total++;
            }
        });
        if (total <= 0) {
            averagePoints[username] = 60;
            return;
        }
        averagePoints[username] = acc / total;
    });

    let result;
    let threshold = 10;
    let count = 0;
    const INCREMENT_COUNT = 5;
    let team1Total;
    let team2Total;
    while(!result) {
        const blue = [];
        const red = [];
        
        team1Total = 0;
        team2Total = 0;
        const randomlySortedNamesCopy = [...names];
        randomlySortedNamesCopy.sort(() => Math.random() - 0.5);

        for (let i = 0; i < 5; i++) {
            const name = randomlySortedNamesCopy[i];
            blue.push(name);
            team1Total += averagePoints[name] || 60;
        }
        for (let i = 5; i < 10; i++) {
            const name = randomlySortedNamesCopy[i];
            red.push(name);
            team2Total += averagePoints[name] || 60;
        }

        const difference = Math.abs(team1Total - team2Total);
        if (difference <= threshold) {
            result = {
                team1: blue,
                team2: red,
            };
        }
        if (count++ >= INCREMENT_COUNT) {
            count = 0;
            threshold += 1;
        }
    }

    console.log(`Blue total: ${team1Total}`);
    console.log(`Red total: ${team2Total}`);
    return result;
}

module.exports = matchmaker;
