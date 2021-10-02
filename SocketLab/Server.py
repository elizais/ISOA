import re
import socket

from sqlalchemy import create_engine
from sqlalchemy import insert
from sqlalchemy import select

from schema import advert


engine = create_engine(
    'sqlite:///database.sqlite',
    future=True,
    connect_args={'check_same_thread': False},
)


# ____________Database work__________________
def create_advert(ad: str) -> None:
    with engine.begin() as connection:
        connection.execute(insert(advert), [{'ad': ad}])


def get_all_advert():
    with engine.connect() as connection:
        ad = connection.execute(select(advert.c.ad)).scalars().all()
    return ad
# __________________________________________


class WordSorter:
    def __init__(self, words: str):
        self.words = words

    def __call__(self):
        list_words = '\n'.join(sorted(list(set(re.split(r'; |, |\*|\n| |\? |\. ', self.words)))))
        return list_words


if __name__ == '__main__':

    sock = socket.socket()
    sock.bind(('', 9090))
    sock.listen(1)
    print('waiting for connection...')
    conn, addr = sock.accept()
    print('connected: ', addr)
    data = conn.recv(1024)
    uData = data.decode("utf-8")
    if uData[0] == '1':
        wordSorter = WordSorter(uData[1:])
        uData = wordSorter()

    else:
        if uData[1:] == 'LIST':
            uData = '; '.join(get_all_advert())
        else:
            create_advert(uData[1:])
            uData = f'Message added: “{uData[1:]}” '
    print("Client > " + uData)
    conn.send(uData.encode("utf-8"))
    conn.close()

