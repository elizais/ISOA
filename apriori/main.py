from apriori import *

if __name__ == '__main__':
    # 1
    dataset = apriori_read_dataset('Market_Basket_Optimisation.csv', header=None)
    dataset = apriori_fill_dataset(dataset, axis=1)
    print(dataset.shape)

    min_supports = [0.01, 0.03, 0.05, 0.1, 0.15]
    min_length = 2
    min_confidence = 0.1
    min_lift = 2
    elapsed_time, length_result = apriori_experiment(dataset, min_supports, min_length, min_confidence, min_lift, 20)

    transactions = apriori_dataset_formation(dataset, 20)
    result = apriori_result(
        transactions,
        min_support=0.01,
        min_length=min_length,
        min_confidence=min_confidence,
        min_lift=min_lift)
    # print(apriori_normal_output(result))

    apriori_plots_result(min_supports, elapsed_time, length_result)

    # 2
    dataset = apriori_read_dataset('Starbucks satisfactory survey.csv', header=None)
    dataset = dataset[1:]
    dataset = apriori_fill_dataset(dataset,  1)

    elapsed_time, length_result = apriori_experiment(dataset, min_supports, min_length, min_confidence, min_lift, 10)

    transactions = apriori_dataset_formation(dataset, 10)
    result = apriori_result(
        transactions,
        min_support=0.01,
        min_length=min_length,
        min_confidence=min_confidence,
        min_lift=min_lift)

    # print(apriori_normal_output(result))

    apriori_plots_result(min_supports, elapsed_time, length_result)
