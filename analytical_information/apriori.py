import pandas as pd
import time
import matplotlib.pyplot as plt

try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO

import apyori


def apriori_read_dataset(file_name: str, header='infer') -> pd.DataFrame:
    dataset = pd.read_csv(file_name, header=header)
    return dataset


def apriori_fill_dataset(dataset: pd.DataFrame, axis) -> pd.DataFrame:
    dataset.fillna(method='ffill', axis=axis, inplace=True)
    print(dataset)
    return dataset


def apriori_dataset_formation(dataset: pd.DataFrame, transactions_length: int) -> list[list[str]]:
    transactions = []
    for i in range(dataset.shape[0]):
        transactions.append([str(dataset.values[i, j]) for j in range(transactions_length)])
    return transactions


def apriori_result(
        transactions: list[list[str]],
        min_support: float, min_length:
        int, min_confidence: float,
        min_lift: int) -> list[tuple]:
    # min_support -- минимальный support для правил (dtype = float).
    # min_confidence -- минимальное значение confidence для правил (dtype = float)
    # min_lift -- минимальный lift (dtype = float)
    # max_length -- максимальная длина itemset (вспоминаем про k-itemset)  (dtype = integer)
    return list(apyori.apriori(
        transactions,
        min_support=min_support,
        min_length=min_length,
        min_confidence=min_confidence,
        min_lift=min_lift))


def apriori_experiment_with_different_min_supports(
        dataset: pd.DataFrame,
        min_supports: list[float],
        min_length: int,
        min_confidence: float,
        min_lift: int,
        transactions_length: int
) -> tuple[list[float], list[int]]:
    transactions = apriori_dataset_formation(dataset, transactions_length)

    elapsed_time = []
    length_result = []

    for min_support in min_supports:
        t0 = time.time()
        result = apriori_result(transactions, min_support, min_length, min_confidence, min_lift)
        print(len(result))
        t1 = time.time()
        print("Time elapsed: ", t1 - t0)
        elapsed_time.append(t1 - t0)
        length_result.append(len(result))

    print(elapsed_time)
    print(length_result)

    return elapsed_time, length_result


def apriori_experiment_with_different_min_confidences(
        dataset: pd.DataFrame,
        min_support: float,
        min_length: int,
        min_confidences: list[float],
        min_lift: int,
        transactions_length: int
) -> tuple[list[float], list[int]]:
    transactions = apriori_dataset_formation(dataset, transactions_length)

    elapsed_time = []
    length_result = []

    for min_confidence in min_confidences:
        t0 = time.time()
        result = apriori_result(transactions, min_support, min_length, min_confidence, min_lift)
        print(len(result))
        t1 = time.time()
        print("Time elapsed: ", t1 - t0)
        elapsed_time.append(t1 - t0)
        length_result.append(len(result))

    print(elapsed_time)
    print(length_result)

    return elapsed_time, length_result


def apriori_normal_output(result: list[tuple]) -> list[list]:
    apriori_output = []

    for elem in result:
        output = [round(elem.support, 4)]

        for item in elem.items:
            output.append(item)
        apriori_output.append(output)

        apriori_output.sort(key=lambda i: i[0])

    return apriori_output


def apriori_plots_result(
        defined_parameter: list[float],
        elapsed_time: list[float],
        length_result: list[int],
        name_experiments: str,
):
    # Построение графиков времени работы при разных знаечниях исследуемого параметра
    plt.bar([str(min_support) for min_support in defined_parameter], elapsed_time)
    plt.xlabel(name_experiments)
    plt.ylabel("Время работы")
    plt.show()

    # График количества наборов при заданном значении исследуемого параметра
    plt.bar([str(min_support) for min_support in defined_parameter], length_result)
    plt.xlabel(name_experiments)
    plt.ylabel("Количество наборов")
    plt.show()
