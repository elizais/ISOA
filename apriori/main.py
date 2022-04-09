import pandas as pd

if __name__ == '__main__':
    dataset = pd.read_csv('Market_Basket_Optimisation.csv', header=None)
    dataset.fillna(method='ffill', axis=1, inplace=True)
    print(dataset)

