from apriori import *

if __name__ == '__main__':
    # 1_1
    dataset = apriori_read_dataset('Market_Basket_Optimisation.csv', header=None)
    dataset = apriori_fill_dataset(dataset, axis=1)
    print(dataset.shape)

    min_supports = [0.01, 0.03, 0.05, 0.1, 0.15]
    min_length = 2
    min_confidence = 0.1
    min_lift = 2
    elapsed_time, length_result = apriori_experiment_with_different_min_supports(dataset, min_supports, min_length,
                                                                                 min_confidence, min_lift, 20)

    transactions = apriori_dataset_formation(dataset, 20)
    result_1 = apriori_result(
        transactions,
        min_support=0.01,
        min_length=min_length,
        min_confidence=min_confidence,
        min_lift=min_lift)
    # print(apriori_normal_output(result_1))

    apriori_plots_result(min_supports, elapsed_time, length_result, "Значение поддержки")

    # 2_2
    dataset = apriori_read_dataset('Starbucks satisfactory survey.csv', header=None)
    dataset = dataset[1:]
    dataset = apriori_fill_dataset(dataset, 1)

    elapsed_time, length_result = apriori_experiment_with_different_min_supports(dataset, min_supports, min_length,
                                                                                 min_confidence, min_lift, 10)

    transactions = apriori_dataset_formation(dataset, 10)
    result_2 = apriori_result(
        transactions,
        min_support=0.01,
        min_length=min_length,
        min_confidence=min_confidence,
        min_lift=min_lift)

    # print(apriori_normal_output(result_2))

    apriori_plots_result(min_supports, elapsed_time, length_result, "Значение поддержки")

    # 1_2
    dataset = apriori_read_dataset('Market_Basket_Optimisation.csv', header=None)
    dataset = apriori_fill_dataset(dataset, axis=1)
    print(dataset.shape)

    min_support = 0.03
    min_length = 2
    min_confidences = [0.1, 0.3, 0.5, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95]
    min_lift = 2
    elapsed_time, length_result = apriori_experiment_with_different_min_confidences(
        dataset,
        min_support,
        min_length,
        min_confidences,
        min_lift,
        20
    )

    transactions = apriori_dataset_formation(dataset, 20)
    result_3 = apriori_result(
        transactions,
        min_support=0.01,
        min_length=min_length,
        min_confidence=min_confidence,
        min_lift=min_lift)
    # print(apriori_normal_output(result_3))

    apriori_plots_result(min_confidences, elapsed_time, length_result, "Значение достоверности")

    # 2_2
    dataset = apriori_read_dataset('Starbucks satisfactory survey.csv', header=None)
    dataset = dataset[1:]
    dataset = apriori_fill_dataset(dataset, 1)

    elapsed_time, length_result = apriori_experiment_with_different_min_confidences(
        dataset,
        min_support,
        min_length,
        min_confidences,
        min_lift,
        10
    )
    transactions = apriori_dataset_formation(dataset, 10)
    result_4 = apriori_result(
        transactions,
        min_support=0.01,
        min_length=min_length,
        min_confidence=min_confidence,
        min_lift=min_lift)

    # print(apriori_normal_output(result_4))

    apriori_plots_result(min_confidences, elapsed_time, length_result, "Значение достоверности")
