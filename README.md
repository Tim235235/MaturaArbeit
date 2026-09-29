# MaturaArbeit

--Testanleitung--

DOM-basierter Adblocker-----------------------------------------------------------------------------------------------------------------------------------------------

--Voraussetzungen--
-Node.js v26.10.0
-Chromium bzw. ein kompatibler Browser
-Das Repository wurde vollständig heruntergeladen.

--Durchführung--
1. Node.js v26.10.0 installieren.
2. In testing/dom-test.js in Zeile 63 die zu untersuchende Website eintragen.
3. testing/dom-test.js mit Node.js ausführen.
4. Die ausgegebenen Messwerte dokumentieren.

Proxybasierter Adblocker-----------------------------------------------------------------------------------------------------------------------------------------------

--Voraussetzungen--
-Python mit den im Projekt verwendeten Bibliotheken
-Browser mit konfigurierbarem Proxy

--Durchführung--
1. Den Proxy auf IP-Adresse 127.0.0.1 und Port 8080 konfigurieren.
2. Den Proxy-Blocker starten.
3. testing/proxy-test.js ausführen.
4. Die ausgegebenen Messwerte dokumentieren.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Reproduzierbarkeit --> Für die Reproduktion der im Rahmen der Maturaarbeit durchgeführten Experimente sollten dieselben Webseiten, Softwareversionen und Testbedingungen 
verwendet werden. Die verwendeten Testwebseiten und die Anzahl der Messungen pro Webseite sind in der Maturaarbeit dokumentiert.
