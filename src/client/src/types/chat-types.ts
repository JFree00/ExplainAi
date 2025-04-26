export enum Sender {
  User,
  System,
}
export interface ChatMessage {
  content: string;
  user: Sender;
}

export interface Chat {
  messages?: ChatMessage[];
  title?: string;
}
export const mockChat: Chat = {
  messages: [
    {
      content: "How are ai models trained?",
      user: Sender.User,
    },
    {
      content:
        "Training an AI model is a multi-step process that essentially teaches a computer program to perform a specific task by learning from data. It's akin to how humans learn from experience, but on a much larger scale and with mathematical precision. Here's a breakdown of the key stages involved:\n" +
        "\n" +
        "**1. Data Collection:** The foundation of any AI model training is data. The type and amount of data required depend heavily on the problem the AI is designed to solve. For instance, training a model to recognize images of cats and dogs requires a large dataset of labeled images of cats and dogs. This data needs to be relevant, representative of the real-world scenarios the AI will encounter, and ideally, free from bias. Data can be collected from various sources, including databases, sensors, web scraping, or even generated synthetically.\n" +
        "\n" +
        "**2. Data Preparation:** Raw data is rarely in a format suitable for direct training. This stage involves several crucial steps:\n" +
        "\n" +
        '* **Annotation (Labeling):** For supervised learning, which is a common training paradigm, data needs to be labeled. This means providing the correct output or target for each input data point. In the cat and dog image example, each image would be labeled as either "cat" or "dog." This process is often human-intensive but critical for the model to learn the association between input and desired output.\n' +
        "* **Preprocessing:** This involves cleaning and transforming the data to make it usable by the model. This can include handling missing values, removing noise, scaling numerical data, converting categorical data into numerical representations, and splitting the data into training, validation, and testing sets. Preprocessing ensures the data is in a consistent format and highlights the relevant features for the model to learn from.\n" +
        "\n" +
        "**3. Model Selection:** Choosing the right AI model architecture is crucial and depends on the nature of the problem. Different tasks require different types of models. Common types include:\n" +
        "\n" +
        "* **Supervised Learning Models:** Trained on labeled data to make predictions or classifications (e.g., linear regression, logistic regression, support vector machines, decision trees, neural networks).\n" +
        "* **Unsupervised Learning Models:** Trained on unlabeled data to find patterns, structures, or relationships within the data (e.g., clustering algorithms like k-means, dimensionality reduction techniques like PCA).\n" +
        "* **Reinforcement Learning Models:** Learn through trial and error by receiving rewards or penalties for their actions in an environment (e.g., training a model to play a game).\n" +
        "* **Deep Learning Models:** A subset of machine learning that uses artificial neural networks with multiple layers to learn complex patterns from large datasets (e.g., convolutional neural networks for images, recurrent neural networks for sequential data, transformers for natural language processing).\n" +
        "\n" +
        "**4. Training the Model:** This is the core of the process where the selected model learns from the prepared data. The training typically involves an iterative process:\n" +
        "\n" +
        "* **Forward Pass:** The training data is fed into the model, and the model makes a prediction or generates an output based on its current internal parameters (weights and biases).\n" +
        "* **Calculating the Loss:** A loss function (or objective function) measures the difference between the model's predicted output and the actual correct output from the labeled data. The goal of training is to minimize this loss.\n" +
        "* **Backward Pass (Backpropagation):** This is a key algorithm used to calculate the gradients of the loss function with respect to the model's parameters. These gradients indicate how much each parameter contributed to the error.\n" +
        "* **Updating Weights:** An optimization algorithm (e.g., gradient descent) uses the calculated gradients to adjust the model's weights and biases. These adjustments are made in a direction that is expected to reduce the loss in the next iteration.\n" +
        "\n" +
        "This cycle of forward pass, loss calculation, backward pass, and weight update is repeated many times over the entire training dataset. Each complete pass through the dataset is called an epoch. The model's parameters are gradually refined with each iteration, allowing it to learn the underlying patterns and relationships in the data.\n" +
        "\n" +
        "**5. Evaluation:** During training, and especially after the training is complete, the model's performance is evaluated on a separate validation dataset (and finally on a test dataset that the model has never seen before). This helps to assess how well the model generalizes to new, unseen data and provides insights into its accuracy, performance, and potential for overfitting (where the model performs well on training data but poorly on new data).\n" +
        "\n" +
        "**6. Hyperparameter Tuning:** AI models have hyperparameters, which are settings that are not learned from the data but are set before the training begins (e.g., learning rate, number of layers in a neural network, number of neurons per layer). Tuning these hyperparameters can significantly impact the model's performance. This often involves experimenting with different hyperparameter values and evaluating the model's performance on the validation set.\n" +
        "\n" +
        "**7. Deployment:** Once the model is trained and evaluated to a satisfactory level, it can be deployed to make predictions or decisions on new, real-world data.\n" +
        "\n" +
        "In essence, training an AI model is an iterative optimization process where the model continuously adjusts its internal workings based on the data it is fed, with the objective of minimizing errors and becoming proficient at the task it is designed for.",
      user: Sender.System,
    },
    {
      content: "Okay!",
      user: Sender.User,
    },
  ],
};
