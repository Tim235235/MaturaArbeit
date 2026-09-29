# MaturaArbeit

## Testanleitung

### DOM-basierter Adblocker

#### Voraussetzungen

1. Node.js v26.10.0
2. Chromium bzw. ein kompatibler Browser
3. Das Repository wurde vollständig heruntergeladen.

#### Durchführung

1. Node.js v26.10.0 installieren.
2. In `testing/dom-test.js` in Zeile 63 die zu untersuchende Webseite eintragen.
3. `testing/dom-test.js` mit Node.js ausführen.
4. Die ausgegebenen Messwerte dokumentieren.

---

### Proxybasierter Adblocker

#### Voraussetzungen

1. Python 3.14.7
2. Die im Projekt benötigten Python-Bibliotheken

#### Durchführung

1. In `testing/proxy-test.js` in Zeile 22 die zu untersuchende Webseite eintragen, z. B. `await page.goto("website link", {waitUntil:"load"});`
2. Den Proxy-Blocker starten.
3. `testing/proxy-test.js` mit Node.js ausführen.
4. Die ausgegebenen Messwerte dokumentieren.

---

### Wichtige Hinweise

1. Für jede Webseite werden vier Messungen durchgeführt.
2. Für eine möglichst genaue Reproduktion sollten dieselben Webseiten, Softwareversionen und Testbedingungen verwendet werden.
3. Die verwendeten Testwebseiten und die Anzahl der Messungen pro Webseite sind in der Maturaarbeit dokumentiert.
