import random
import pandas as pd

from sklearn import metrics
from sklearn import datasets
from sklearn.cluster import KMeans

import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

import numpy as np
from numpy import mean
from numpy.ma.core import sqrt


def calculation_error_space_2(x, cluster_centers):
    r = []
    for c in cluster_centers:
        r.append(sqrt((c[0] - x[0]) ** 2 + (c[1] - x[1]) ** 2))
    return r


def calculation_error_space_3(x, cluster_centers):
    r = []
    for c in cluster_centers:
        r.append(sqrt((c[0] - x[0]) ** 2 + (c[1] - x[1]) ** 2 + (c[2] - x[2]) ** 2))
    return r


def noise_generation(noise, X, space=2):
    X_noised = X.copy()
    if (space==2):
        for i in range(int(round(noise * len(X)))):
            X_noised[i][0] = X[i][0] + round(random.randint(-30, 30) / 10, 1)
            X_noised[i][1] = X[i][1] + round(random.randint(-30, 30) / 10, 1)

    if (space==3):
        for i in range(int(round(noise * len(X)))):
            X_noised[i][0] = list(X['Age'])[i] + round(random.randint(-30, 30) / 10, 1)
            X_noised[i][1] = list(X['YearsEmployed'])[i] + round(random.randint(-30, 30) / 10, 1)
            X_noised[i][2] = list(X['Income'])[i] + round(random.randint(-30, 30) / 10, 1)
    return X_noised


def clustering(x_noised, space):
    errors = []
    results = []

    for n_clstrs in [3, 4, 5, 6, 7, 8, 9]:
        model = KMeans(n_clusters=n_clstrs, init='k-means++')
        model.fit(x_noised)
        clust = model.predict(x_noised)

        err = []
        for x in x_noised:
            if space == 2:
                err.append(min(calculation_error_space_2(x, model.cluster_centers_)))
            else:
                err.append(min(calculation_error_space_3(x, model.cluster_centers_)))
        errors.append(mean(err))

        res = []
        for i in range(len(x_noised)):
            res.append('Координаты: ' + str(x_noised[i]) + '; Кластер: ' + str(clust[i]) + '; Ошибка: ' + str(err[i]))
        results.append(res)

    return results, errors

