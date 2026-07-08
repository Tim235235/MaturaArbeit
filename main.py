import socket 
import threading 
from domainBlock import Blocker
 
class Server: 
    def __init__(self, blocker): 
        self.serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
        self.client_list = []
        self.blocker = blocker
 
    def handle(self, client_socket): 
        try:
            while True:
                data = client_socket.recv(1024)
                if not data:
                    break

                request_parts = data.decode().split(" ")
                
                if request_parts[0]=="CONNECT": 
                    host_port = request_parts[1]
                    if ":" in host_port:
                        host, port = host_port.split(":")
                        port = int(port)
                    else:
                        host = host_port
                        port = 443
                    if self.blocker.block(host):
                        print(f"{host} is blocked")
                        break
                    else:
                        print(f"Trying to connect to: '{host}' port {port}")
                        destination_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                        destination_socket.connect((host, port))
                        client_socket.send(bytes("HTTP/1.1 200 Connection established\r\n\r\n", encoding="utf-8"))
                        server_client_thread = threading.Thread(target=self.relay, args=(client_socket, destination_socket))
                        client_server_thread = threading.Thread(target=self.relay, args=(destination_socket, client_socket))
                        server_client_thread.start()
                        client_server_thread.start()
                        break


        except Exception as e: 
            print(f"Error handling client: {e}")

    
    def relay(self, src_socket, dest_socket):
        try:
            while True:
                recieved_bytes = src_socket.recv(1024)
                if not recieved_bytes:
                    break
                dest_socket.sendall(recieved_bytes)
        except Exception as e:
            print(f"Error handling client: {e}")

    def list_client(self): 
        for i in self.client_list: 
            print(i) 
 
    def connect(self): 
        self.blocker.create_list()
        self.serverSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.serverSocket.bind(("localhost", 8080)) 
        self.serverSocket.listen(1)
        while True: 
            client, address = self.serverSocket.accept() 
            thread = threading.Thread(target=self.handle, args=(client,)) 
            thread.start() 
 
 
block = Blocker()
server = Server(block) 
server.connect() 
 
#['CONNECT', 'www.google.com:443', 'HTTP/1.1\r\nHost:', 'www.google.com:443\r\nProxy-Connection:', 'keep-alive\r\nUser-Agent:', 'Mozilla/5.0', '(Macintosh;', 'Intel', 'Mac', 'OS', 'X', '10_15_7)', 'AppleWebKit/537.36', '(KHTML,', 'like', 'Gecko)', 'Chrome/148.0.0.0', 'Safari/537.36', 'OPR/132.0.0.0', '(Edition', 'std-2)\r\n\r\n'] 
#Error handling client: invalid literal for int() with base 10: 'i.ytimg.com' 
 
 
