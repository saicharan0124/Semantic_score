import axios from "axios";

function convertStringToArray(sentenceString) {
  // Split the input string into an array of sentences
  const sentencesArray = sentenceString
    .split("\n")
    .map((sentence) => sentence.trim());

  // Filter out empty sentences
  const nonEmptySentences = sentencesArray.filter(
    (sentence) => sentence !== ""
  );

  return nonEmptySentences;
}

export async function calculateCosineSimilaritymatrix(sentenceArray) {
  try {
    const temp = [
      "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.",
      "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.",
      " Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.",
      " Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.",
      " Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.",
      "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.",
      " Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.",
      " Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.",
      "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.",
      " Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.",
      "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.",
      "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.",
      "Apply principles of mechanical engineering and physical sciences to model, analyze, design and select appropriate materials and manufacturing processes to create engineering solutions (products, systems, or processes) during their Mini-Project and Thesis Project Work.",
      "Work with contemporary technologies through multi-pronged opportunities such as Industry-linked One Credit Courses, In-plant Training, and Internships together with a Fast-tracked curriculum.",
      "Participate in team hackathons and develop critical thinking skills via hands-on-experience in research experiments to become an entrepreneur or initiate a start-up.",
    ];

    // Create an array of promises for each API call
    const apiCalls = sentenceArray.map((sentence) => {
      // Convert the sentence to an array using the provided function
      const convertedSentence = convertStringToArray(sentence);

      // Create data object for POST request
      const data = {
        sentences1: convertedSentence,
        sentences2: temp,
      };

      // Make a POST request using Axios
      return axios.post(
        "https://saicharan1234-semanticscore.hf.space/calculate-cosine-similarity-tabulated",
        data
      );
    });

    // Use Promise.all to execute all API calls concurrently
    const responses = await Promise.all(apiCalls);

    // Extract the similarity tables from the responses
    const similarityTables = responses.map(
      (response) => response.data.cosine_similarity_table
    );
        console.log(similarityTables)
    // Return an array of similarity tables for each input sentence
    return similarityTables;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error calculating similarity:", error);
    throw error; // Propagate the error to the caller if needed
  }
}
