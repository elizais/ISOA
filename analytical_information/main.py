from apriori import *
from decision_tree import *
import numpy as np
import random
from mpl_toolkits.mplot3d import Axes3D
from sklearn import datasets
from sklearn.utils import shuffle
from sklearn.cluster import KMeans
from k_Means import noise_generation, clustering, calculation_error_space_3
from numpy import mean

if __name__ == '__main__':
    # # apriori
    #
    # # 1_1
    # dataset = apriori_read_dataset('Market_Basket_Optimisation.csv', header=None)
    # dataset = apriori_fill_dataset(dataset, axis=1)
    # print(dataset.shape)
    #
    # min_supports = [0.01, 0.03, 0.05, 0.1, 0.15]
    # min_length = 2
    # min_confidence = 0.1
    # min_lift = 2
    # elapsed_time, length_result = apriori_experiment_with_different_min_supports(dataset, min_supports, min_length,
    #                                                                              min_confidence, min_lift, 20)
    #
    # transactions = apriori_dataset_formation(dataset, 20)
    # result_1 = apriori_result(
    #     transactions,
    #     min_support=0.01,
    #     min_length=min_length,
    #     min_confidence=min_confidence,
    #     min_lift=min_lift)
    # # print(apriori_normal_output(result_1))
    #
    # apriori_plots_result(min_supports, elapsed_time, length_result, "Значение поддержки")
    #
    # # 2_2
    # dataset = apriori_read_dataset('Starbucks satisfactory survey.csv', header=None)
    # dataset = dataset[1:]
    # dataset = apriori_fill_dataset(dataset, 1)
    #
    # elapsed_time, length_result = apriori_experiment_with_different_min_supports(dataset, min_supports, min_length,
    #                                                                              min_confidence, min_lift, 10)
    #
    # transactions = apriori_dataset_formation(dataset, 10)
    # result_2 = apriori_result(
    #     transactions,
    #     min_support=0.01,
    #     min_length=min_length,
    #     min_confidence=min_confidence,
    #     min_lift=min_lift)
    #
    # # print(apriori_normal_output(result_2))
    #
    # apriori_plots_result(min_supports, elapsed_time, length_result, "Значение поддержки")
    #
    # # 1_2
    # dataset = apriori_read_dataset('Market_Basket_Optimisation.csv', header=None)
    # dataset = apriori_fill_dataset(dataset, axis=1)
    # print(dataset.shape)
    #
    # min_support = 0.03
    # min_length = 2
    # min_confidences = [0.1, 0.3, 0.5, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95]
    # min_lift = 2
    # elapsed_time, length_result = apriori_experiment_with_different_min_confidences(
    #     dataset,
    #     min_support,
    #     min_length,
    #     min_confidences,
    #     min_lift,
    #     20
    # )
    #
    # transactions = apriori_dataset_formation(dataset, 20)
    # result_3 = apriori_result(
    #     transactions,
    #     min_support=0.01,
    #     min_length=min_length,
    #     min_confidence=min_confidence,
    #     min_lift=min_lift)
    # # print(apriori_normal_output(result_3))
    #
    # apriori_plots_result(min_confidences, elapsed_time, length_result, "Значение достоверности")
    #
    # # 2_2
    # dataset = apriori_read_dataset('Starbucks satisfactory survey.csv', header=None)
    # dataset = dataset[1:]
    # dataset = apriori_fill_dataset(dataset, 1)
    #
    # elapsed_time, length_result = apriori_experiment_with_different_min_confidences(
    #     dataset,
    #     min_support,
    #     min_length,
    #     min_confidences,
    #     min_lift,
    #     10
    # )
    # transactions = apriori_dataset_formation(dataset, 10)
    # result_4 = apriori_result(
    #     transactions,
    #     min_support=0.01,
    #     min_length=min_length,
    #     min_confidence=min_confidence,
    #     min_lift=min_lift)
    #
    # # print(apriori_normal_output(result_4))
    #
    # apriori_plots_result(min_confidences, elapsed_time, length_result, "Значение достоверности")
    #
    # # decision tree
    # dataset_2 = pd.read_csv("Starbucks satisfactory survey.csv")
    # dataset = apriori_read_dataset("grades.csv")
    # name_dataset = 'grades'
    # print(dataset.shape)
    # print(dataset.head())
    #
    # columns = ['PUPIL_SEX', 'PUPIL_CLASS']
    #
    # dataset = decision_tree_label_encoder_function_data_frame(dataset, columns)
    #
    # reports = decision_tree_result(dataset, name_dataset, 'GRADE')
    # print([report['accuracy'] for report in reports])
    # tree_plots_result(reports)


    # датасет iris

    iris = datasets.load_iris()
    X = iris.data[:, [0, 2]]
    y = iris.target
    X, y = shuffle(X, y, random_state=42)

    noise = 0.3

    x_noises = []

    X_noised = noise_generation(noise, X)
    results, errors = clustering(X_noised, 2)
    x_min, x_max = X[:, 0].min() - 0.5, X[:, 0].max() + 0.5
    y_min, y_max = X[:, 1].min() - 0.5, X[:, 1].max() + 0.5

    model1 = KMeans(n_clusters=3)
    model1.fit(X_noised)
    clust = model1.predict(X_noised)

    plt.figure(2, figsize=(8, 6))
    plt.clf()
    plt.scatter(X[:, 0], X[:, 1], c=y, cmap=plt.cm.Set1, edgecolor="k")
    plt.xlabel("Длина чашелистика")
    plt.ylabel("Длина лепестка")
    plt.xlim(x_min, x_max)
    plt.ylim(y_min, y_max)
    plt.xticks()
    plt.yticks()
    plt.show()

    plt.bar(['3', '4', '5', '6', '7', '8', '9'], errors)
    plt.ylabel("Значение ошибки")
    plt.xlabel("Количество кластеров")
    plt.show()

    ###################
    customers = pd.read_csv('customers.csv')

    X = customers[['Age', 'YearsEmployed', 'Income']]
    y = customers[['Defaulted']]
    X, y = shuffle(X, y, random_state=42)

    X_noised = np.zeros(X.shape)
    for i in range(len(X)):
        X_noised[i][0] = list(X['Age'])[i]
        X_noised[i][1] = list(X['YearsEmployed'])[i]
        X_noised[i][2] = list(X['Income'])[i]

    errors1 = []
    results = []
    noise = 0.0  # 0.0, 0.1, 0.2, 0.3, 0.4

    for i in range(int(round(noise * len(X)))):
        X_noised[i][0] = list(X['Age'])[i] + round(random.randint(-30, 30) / 10, 1)
        X_noised[i][1] = list(X['YearsEmployed'])[i] + round(random.randint(-30, 30) / 10, 1)
        X_noised[i][2] = list(X['Income'])[i] + round(random.randint(-30, 30) / 10, 1)

    for n_clstrs in [3, 4, 5, 6, 7, 8, 9]:
        model = KMeans(n_clusters=n_clstrs, init='k-means++')  # init{'k-means++', 'random'}
        model.fit(X_noised)
        clust = model.predict(X_noised)

        err = []
        for x in X_noised:
            err.append(min(calculation_error_space_3(x, model.cluster_centers_)))
        errors1.append(mean(err))

        res = []
        for i in range(len(X_noised)):
            res.append('Координаты: ' + str(X_noised[i]) + '; Кластер: ' + str(clust[i]) + '; Ошибка: ' + str(err[i]))
        results.append(res)

        model1 = KMeans(n_clusters=3)
        model1.fit(X_noised)
        clust = model1.predict(X_noised)

        fig = plt.figure(1, figsize=(8, 6))
        ax = Axes3D(fig, elev=-150, azim=110)
        ax.scatter(
            X_noised[:50, 0],
            X_noised[:50, 1],
            X_noised[:50, 2],
            c=clust[:50],
            cmap=plt.cm.Set1,
            edgecolor="k",
            s=40,
        )
        ax.set_xlabel("Age")
        ax.w_xaxis.set_ticklabels([])
        ax.set_ylabel("YearsEmployed")
        ax.w_yaxis.set_ticklabels([])
        ax.set_zlabel("Income")
        ax.w_zaxis.set_ticklabels([])
        plt.show()


        plt.bar(['3', '4', '5', '6', '7', '8', '9'], errors1)
        plt.ylabel("Значение ошибки")
        plt.xlabel("Количество кластеров")
        plt.show()
















