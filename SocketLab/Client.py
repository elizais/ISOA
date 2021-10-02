import socket
from typing import Union


def select_application(app: Union[int, str], sock):
    if app == '1' or app == 'WordSorter':
        chain_words = input('enter a word chain\n')
        sock.send(bytes(''.join(['1', chain_words]), "utf-8"))
        data = sock.recv(1024)
        udata = data.decode("utf-8")
        print("Server > " + udata)
    elif app == '2' or app == 'BulletinBoard':
        command = input('enter the command i have to do\n')
        if command == '':
            return 'I got an empty line '
        sock.send(bytes(''.join(['2', command]), "utf-8"))
        data = sock.recv(1024)
        udata = data.decode("utf-8")
        print("Server > " + udata)
    else:
        return "I don't know what I what should I do"
    return "Task completed"

if __name__ == '__main__':
    app = input("Введите \n"
                "1 или 'WordSorter' если хотите запустить сортирофщик слов\n"
                "2 или 'BulletinBoard' есди - Доска объявлений\n")

    sock = socket.socket()
    sock.connect(('localhost', 9090))
    print(select_application(app, sock))
    sock.close()

