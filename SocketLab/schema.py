from sqlalchemy import create_engine
from sqlalchemy import Column
from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import Integer
from sqlalchemy import String

metadata = MetaData()

advert = Table(
    'advert',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('ad', String, nullable=False)
)

if __name__ == '__main__':
    engine = create_engine(
        'sqlite:///database.sqlite',
        future=True,
        connect_args={'check_same_thread': False},
    )
    metadata.create_all(engine)