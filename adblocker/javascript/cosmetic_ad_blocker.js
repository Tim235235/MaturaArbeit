const rules = [];
let blockedElements = 0;

var req = new XMLHttpRequest();

req.open(
    "GET",
    "https://easylist.to/easylist/easylist.txt"
);

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
                    selector.includes("}") ||
                    selector.includes(":has") ||
                    selector.includes(":xpath") ||
                    selector.includes("+js") ||
                    selector.includes(":matches")
                )
                    continue;
                if (
                    selector === "html" ||
                    selector === "body" ||
                    selector === "*"
                )
                    continue;
                rules.push(selector);
            }
        }

        console.log("Loaded rules:", rules.length);


        function blockAds() {
            for (let rule of rules) {
                try {
                    const elements =
                        document.querySelectorAll(rule);

                    for (let element of elements) {
                        if (element.dataset.adblocked)
                            continue;
                        element.dataset.adblocked = "true";
                        element.style.setProperty(
                            "display",
                            "none",
                            "important"
                        );
                        blockedElements++;
                    }
                } catch(error) {}
            }
            window.blockedAds = blockedElements;
        }


        blockAds();


        const observer = new MutationObserver(() => {
            blockAds();
        });


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    }

};

req.send();