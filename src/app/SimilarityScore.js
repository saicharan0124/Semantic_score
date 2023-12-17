import axios from "axios";

const replacements = {
  po1: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.",
  po2: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.",
  po3: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.",
  po4: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.",
  po5: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.",
  po6: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.",
  po7: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.",
  po8: "Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.",
  po9: "Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.",
  po10: "Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.",
  po11: "Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.",
  po12: "Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.",
  pso1: "Apply principles of mechanical engineering and physical sciences to model, analyze, design and select appropriate materials and manufacturing processes to create engineering solutions (products, systems, or processes) during their Mini-Project and Thesis Project Work.",
  pso2: "Work with contemporary technologies through multi-pronged opportunities such as Industry-linked One Credit Courses, In-plant Training, and Internships together with a Fast-tracked curriculum.",
  pso3: "Participate in team hackathons and develop critical thinking skills via hands-on-experience in research experiments to become an entrepreneur or initiate a start-up.",
};

function replaceSentence(sentence) {
  const key = sentence.toLowerCase(); // Convert to lowercase for case-insensitive comparison
  return replacements[key] || sentence;
}

function shouldReplaceSentence(sentence) {
  return Object.keys(replacements).some((key) =>
    sentence.toLowerCase().includes(key)
  );
}

// Define a function for making a POST request
export async function calculateCosineSimilarity(sentence1, sentence2) {
  try {
    const apiUrl =
      "https://saicharan1234-semanticscore.hf.space/calculate-cosine-similarity"; // Replace with your actual API endpoint

    const shouldReplace1 = shouldReplaceSentence(sentence1);
    const shouldReplace2 = shouldReplaceSentence(sentence2);

    const updatedSentence1 = shouldReplace1
      ? replaceSentence(sentence1)
      : sentence1;
    const updatedSentence2 = shouldReplace2
      ? replaceSentence(sentence2)
      : sentence2;

    const requestData = {
      sentence1: updatedSentence1,
      sentence2: updatedSentence2,
    };

    // Send a POST request to the API
    const response = await axios.post(apiUrl, requestData);

    // Extract the cosine similarity result from the response
    const cosineSimilarity = response.data.cosine_similarity;

    const limitedCosineSimilarity = cosineSimilarity.toFixed(4);

    return limitedCosineSimilarity;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("An error occurred during the request:", error);
    throw error; // You can handle the error as needed
  }
}
