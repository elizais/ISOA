import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report, confusion_matrix
from pydotplus import graph_from_dot_data
from sklearn.tree import export_graphviz
from six import StringIO


def decision_tree_label_encoder_function(column: pd.DataFrame, column_name: str) -> list[int]:
    label_encoder = preprocessing.LabelEncoder()
    label_encoder.fit(column[column_name])
    return label_encoder.transform(column[column_name])


def decision_tree_label_encoder_function_data_frame(
        dataset: pd.DataFrame,
        list_encoding_column_name: list[str]
):
    for name in list_encoding_column_name:
        dataset[name] = decision_tree_label_encoder_function(dataset, name)
    return dataset


def decision_tree_split_dataset_to_train_test(x: pd.DataFrame, y: pd.DataFrame, test_size):
    return train_test_split(x, y, test_size=test_size)


def decision_tree(x_train: pd.DataFrame, y_train: pd.DataFrame):
    classifier = DecisionTreeClassifier()
    classifier.fit(x_train, y_train)


def result_decision_tree(classifier, x_test: pd.DataFrame, y_test: pd.DataFrame, zero_division):
    y_predict = classifier.predict(x_test)

    predict_matrix = confusion_matrix(y_test, y_predict)
    predict_classification_report = classification_report(y_test, y_predict, zero_division=zero_division)

    print(predict_matrix)
    print(predict_classification_report)

    return predict_matrix, predict_classification_report


def tree_plots_result(
        reports: list[tuple],
):
    fig = plt.figure()
    X = np.arange(len(reports))
    ax = fig.add_axes([0, 0, 1, 1])
    data = []
    for report in reports:
        data.append([
            report['macro avg']['precision'],
            report['macro avg']['recall'],
            report['macro avg']['f1-score'],
            report['accuracy']
        ])
    ax.bar(X + 0.00, [d[0] for d in data], color='b', width=0.2)
    ax.bar(X + 0.20, [d[1] for d in data], color='g', width=0.2)
    ax.bar(X + 0.40, [d[2] for d in data], color='r', width=0.2)
    ax.bar(X + 0.60, [d[3] for d in data], color='y', width=0.2)
    ax.set_xlabel('level of quality indicators')
    ax.set_xticks(X, ('0.10', '0.20', '0.30', '0.40'))
    ax.set_yticks(np.arange(0, 0.8, 0.1))
    ax.legend(labels=['precision', 'recall', 'f1-score', 'accuracy'])
    plt.show()


def decision_tree_result(dataset: pd.DataFrame, name_dataset: str):
    X = dataset.drop(['GRADE'], axis=1)
    Y = dataset['GRADE']

    test_sizes = [0.10, 0.20, 0.30, 0.40]

    reports = []

    for test_size in test_sizes:
        x_train, x_test, y_train, y_test = decision_tree_split_dataset_to_train_test(X, Y, test_size)
        classifier = DecisionTreeClassifier()
        classifier.fit(x_train, y_train)

        y_pred = classifier.predict(x_test)

        reports.append(classification_report(y_test, y_pred, zero_division=1, output_dict=True))
        print(classification_report(y_test, y_pred, zero_division=1))

        dot_data = StringIO()

        export_graphviz(classifier, out_file=dot_data, feature_names=X.columns, max_depth=6)

        graph = graph_from_dot_data(dot_data.getvalue())
        graph.write_png("tree_"+name_dataset+str(test_size)+".png")

    return reports




