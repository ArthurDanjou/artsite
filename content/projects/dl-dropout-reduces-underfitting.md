---
slug: dl-dropout-reduces-underfitting
title: Dropout Reduces Underfitting
type: Research Project
description: TensorFlow/Keras implementation and reproduction of "Dropout Reduces Underfitting" (Liu et al., 2023). A comparative study of Early and Late Dropout strategies to optimize model convergence.
shortDescription: Reproduction of "Dropout Reduces Underfitting" with TensorFlow/Keras, comparing Early and Late Dropout strategies.
publishedAt: 2024-12-10
readingTime: 6
status: Completed
tags:
  - Python
  - TensorFlow
  - Deep Learning
  - Research
icon: i-ph-share-network-duotone
---

> **Study and reproduction of the paper:** Liu, Z., et al. (2023). *Dropout Reduces Underfitting*. arXiv:2303.01500.

The paper is available at: [https://arxiv.org/abs/2303.01500](https://arxiv.org/abs/2303.01500)

This repository contains a robust, modular **TensorFlow/Keras** implementation of **Early Dropout** and **Late Dropout** strategies. The goal is to verify the hypothesis that dropout, traditionally used to reduce overfitting, can also combat underfitting when applied only during the initial training phase.

::BackgroundTitle{title="Scientific Objectives"}
::

The study aims to validate the operating regimes of Dropout described in the paper:

1. **Early Dropout** (Targeting Underfitting): Active only during the initial phase to reduce gradient variance and align their direction, enabling better final optimization.
2. **Late Dropout** (Targeting Overfitting): Disabled at the start to allow rapid learning, then activated to regularize final convergence.
3. **Standard Dropout**: Constant rate throughout training (baseline).
4. **No Dropout**: Control experiment without dropout.

::BackgroundTitle{title="Technical Architecture"}
::

Unlike naive Keras callback implementations, this project uses a **dynamic approach via the TensorFlow graph** to ensure the dropout rate updates on the GPU without model recompilation.

### Key Components

* **`DynamicDropout`**: A custom layer inheriting from `keras.layers.Layer` that reads its rate from a shared `tf.Variable`.
* **`DropoutScheduler`**: A Keras `Callback` that drives the rate variable based on the current epoch and the chosen strategy (`early`, `late`, `standard`).
* **`ExperimentPipeline`**: An orchestrator class that handles data loading (MNIST, CIFAR-10, Fashion MNIST), model creation (Dense or CNN), and execution of comparative benchmarks.

::BackgroundTitle{title="File Structure"}
::

```
.
├── README.md                         # This documentation file
├── Dropout reduces underfitting.pdf  # Original research paper
├── pipeline.py                       # Main experiment pipeline
├── pipeline.ipynb                    # Jupyter notebook for experiments
├── pipeline_mnist.ipynb              # Jupyter notebook for MNIST experiments
├── pipeline_cifar10.ipynb            # Jupyter notebook for CIFAR-10 experiments
├── pipeline_cifar100.ipynb           # Jupyter notebook for CIFAR-100 experiments
├── pipeline_fashion_mnist.ipynb      # Jupyter notebook for Fashion MNIST experiments
├── requirements.txt                  # Python dependencies
├── .python-version                   # Python version specification
└── uv.lock                           # Dependency lock file
```

::BackgroundTitle{title="Installation"}
::

```bash
# Clone the repository
git clone https://github.com/arthurdanjou/dropoutreducesunderfitting.git
cd dropoutreducesunderfitting
```

::BackgroundTitle{title="Install dependencies"}
::
```bash
pip install tensorflow numpy matplotlib seaborn scikit-learn
```

::BackgroundTitle{title="Usage"}
::

The main notebook pipeline.ipynb contains all necessary code. Here is how to run a typical experiment via the pipeline API.

### 1. Initialization

Choose your dataset (cifar10, fashion_mnist, mnist) and architecture (cnn, dense).
```python
from pipeline import ExperimentPipeline

# Fashion MNIST is recommended to observe underfitting/overfitting nuances
exp = ExperimentPipeline(dataset_name="fashion_mnist", model_type="cnn")
```

### 2. Learning Curves Comparison

Compare training dynamics (loss and accuracy) of the three strategies.

```python
exp.compare_learning_curves(
    modes=["standard", "early", "late"],
    switch_epoch=10,  # The epoch where dropout state changes
    rate=0.4,         # Dropout rate
    epochs=30
)
```

### 3. Ablation Studies

Study the impact of the "Early" phase duration or Dropout intensity.

```python
# Impact of the switch epoch on final performance
exp.compare_switch_epochs(
    switch_epochs=[5, 10, 15, 20],
    modes=["early"],
    rate=0.4,
    epochs=30
)

# Impact of the dropout rate
exp.compare_drop_rates(
    rates=[0.2, 0.4, 0.6],
    modes=["standard", "early"],
    switch_epoch=10,
    epochs=25
)
```

### 4. Data Regimes (Data Scarcity)

Verify the paper's hypothesis that Early Dropout shines on large datasets (or limited models) while Standard Dropout protects small datasets.

```python
# Training on 10%, 50% and 100% of the dataset
exp.run_dataset_size_comparison(
    fractions=[0.1, 0.5, 1.0],
    modes=["standard", "early"],
    rate=0.3,
    switch_epoch=10
)
```

::BackgroundTitle{title="Expected Results"}
::

According to the paper, you should observe:

- Early Dropout: Higher initial loss, followed by a sharp drop after the switch_epoch, often reaching a lower minimum than Standard Dropout (reduction of underfitting).
- Late Dropout: Rapid rise in accuracy at the start (potential overfitting), then stabilized by the activation of dropout.

::BackgroundTitle{title="Detailed Report"}
::

<iframe src="/projects/dropout-reduces-underfitting.pdf" width="100%" height="1000px">
</iframe>

::BackgroundTitle{title="Authors"}
::

- [Arthur Danjou](https://github.com/ArthurDanjou)
- [Alexis Mathieu](https://github.com/Alex6535)
- [Axelle Meric](https://github.com/AxelleMeric)
- [Philippine Quellec](https://github.com/Philippine35890)
- [Moritz Von Siemens](https://github.com/MoritzSiem)

M.Sc. Statistical and Financial Engineering (ISF) - Data Science Track at Université Paris-Dauphine PSL

Based on the work of Liu, Z., et al. (2023). Dropout Reduces Underfitting.
