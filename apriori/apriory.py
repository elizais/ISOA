from itertools import combinations
import pandas as pd
import numpy as np
import time
import matplotlib.pyplot as plt

import json
import shutil, os

try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO
from IPython.display import display, HTML

import apyori


def apriori_dataset_market_basket_optimisation() -> pd.DataFrame:
    dataset = pd.read_csv('Market_Basket_Optimisation.csv', header=None)
    print(dataset)

    dataset.fillna(method='ffill', axis=1, inplace=True)
    print(dataset)
    return dataset


def apriori_dataset_formation(dataset: pd.DataFrame) -> list:
    transactions = []
    for i in range(dataset.shape[2]):
        transactions.append([str(dataset.values[i, j]) for j in range(0, 20)])
    return transactions


def apriori_result(transactions: list, min_support: float, min_length: int, min_confidence: float) -> list[tuple]:
    # min_support -- минимальный support для правил (dtype = float).
    # min_confidence -- минимальное значение confidence для правил (dtype = float)
    # min_lift -- минимальный lift (dtype = float)
    # max_length -- максимальная длина itemset (вспоминаем про k-itemset)  (dtype = integer)
    return list(
        apyori.apriori(transactions, min_support=min_support, min_length=min_length, min_confidence=min_confidence))


def apriori_experiment(
        dataset: pd.DataFrame,
        min_supports: list[float],
        min_length: int,
        min_confidence: float
) -> tuple[list[float], list[int]]:
    transactions = apriori_dataset_formation(dataset)

    # min_supports = [0.01, 0.03, 0.05, 0.1, 0.15]
    # min_length = 2
    # min_confidence = 0.1
    elapsed_time = []
    length_result = []

    for min_support in min_supports:
        t0 = time.time()
        result = apriori_result(transactions, min_support, min_length, min_confidence)
        print(len(result))
        t1 = time.time()
        print("Time elapsed: ", t1 - t0)
        elapsed_time.append(t1 - t0)
        length_result.append(len(result))

    print(elapsed_time)
    print(length_result)

    return elapsed_time, length_result


def apriori_output_json(result: list[tuple]) -> pd.DataFrame:
    output = []

    for RelationRecord in result:
        o = StringIO()
        apyori.dump_as_json(RelationRecord, o)
        output.append(json.loads(o.getvalue()))

    data_df = pd.DataFrame(output)
    # и взгялнем на итоги
    pd.set_option('display.max_colwidth', None)

    display(HTML(data_df.to_html()))

    return data_df


def apriori_normal_output(result: list[tuple]) -> list[list]:
    apriori_output = []

    for elem in result:
        output = [round(elem.support, 4)]

        for item in output.items:
            output.append(item)
        apriori_output.append(output)

        apriori_output.sort(key=lambda i: i[0])

    return apriori_output


def apriori_plots_result(min_supports: list[float], elapsed_time: list[float], length_result: list[int]):
    # Построение графиков времени работы при разных знаечниях поддержки
    plt.bar([str(min_support) for min_support in min_supports], elapsed_time)
    plt.xlabel("Значение поддержки")
    plt.ylabel("Время работы")
    plt.show()

    # График количества наборов при заданном значении задержки
    plt.bar([str(min_support) for min_support in min_supports], length_result)
    plt.xlabel("Значение поддержки")
    plt.ylabel("Количество наборов")
    plt.show()
