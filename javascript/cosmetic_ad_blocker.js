const rules = [];
var req = new XMLHttpRequest();
req.open("GET", "https://easylist.to/easylist/easylist.txt");
req.onload = function () {
    if (req.status == 200) {

        let text = req.responseText;
        const lines = text.split("\n");
        for (let line of lines) {
            line = line.trim();

            if (line.startsWith("!") || line === "")
                continue;
            if (line.includes("##")) {
                let parts = line.split("##");
                if (parts[0] !== "")
                    continue;
                let selector = parts[1].trim();
                if (
                    selector.includes("{") ||
                    selector.includes("}")
                ) {
                    continue;
                }
                if (
                    selector.includes(":has") ||
                    selector.includes(":xpath") ||
                    selector.includes("+js") ||
                    selector.includes(":matches")
                ) {
                    continue;
                }
                if (
                    selector === "html" ||
                    selector === "body" ||
                    selector === "*"
                ) {
                    continue;
                }
                rules.push(selector);
            }
        }
        console.log("Loaded rules:", rules.length);
        for (let rule of rules) {
            try {
                const elements = document.querySelectorAll(rule);
                if (elements.length > 0) {
                    console.log(
                        "Removing:",
                        rule,
                        elements
                    );
                    for (let element of elements) {
                        element.remove()
                    }
                }

            } catch (error) {

                console.log(
                    "Invalid selector:",
                    rule
                );

            }
        }
    }
};


req.send();