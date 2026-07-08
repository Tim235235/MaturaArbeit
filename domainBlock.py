import requests
from adblockparser import AdblockRules

class Blocker:
    def __init__(self):
        self.raw_rules = []

    def create_list(self):
        text = str(requests.get("https://easylist.to/easylist/easylist.txt").text).split("\n")
        for i in text:
            self.raw_rules.append(i)
        self.rules = AdblockRules(self.raw_rules)
        print("Rules loaded:", len(self.raw_rules))

    def block(self, host):
        url = f"https://{host}/"
        return self.rules.should_block(url)


blocker = Blocker()
blocker.create_list()
