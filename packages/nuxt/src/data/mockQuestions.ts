import type { Test } from '@/types/test'

export const mockTest: Test = {
  id: 'mockTest123',
  name: 'Preview',
  description:
    'The AMC MCQ test is a standardized exam designed to assess the medical knowledge and clinical skills of international medical graduates who wish to practice medicine in Australia. The test consists of multiple-choice questions covering a broad range of medical topics such as anatomy, physiology, pharmacology, and pathology. The exam is considered challenging and requires a deep understanding of fundamental medical concepts and their practical applications in clinical settings. Our mock test product is designed to help candidates prepare for the AMC MCQ test and familiarize themselves with the format, style, and level of difficulty of the exam. The mock test includes questions that are similar to those found on the actual exam, providing candidates with a realistic and effective way to gauge their knowledge and identify areas where they need to improve.',
  type: 'MCQ',
  timeLimit: 1,
  instructions: `
  <ul style="padding-left: 36px; list-style: upper-latin;">
    <li>Ensure you have a stable internet connection to avoid any disruptions during the test.</li>
    <li>Find a quiet and comfortable space to take the test, free from distractions.</li>
    <li>Keep a notepad and pen/pencil handy for rough work, if needed.</li>
    <li>Set aside the required time for the test to be completed uninterrupted.</li>
    <li>Read each question carefully and pay attention to the specific instructions provided.</li>
    <li>Remember that the preview test is a sample of the actual test, so use this opportunity to familiarize yourself with the format and types of questions.</li>
    <li>Stay calm and focused throughout the test, as this will help you perform better.</li>
  </ul>
  <p>Once you're ready, click the 'Start the test' button and begin your journey towards success!</p>
  `,
  thumbnail: [],
  questions: [
    {
      id: 'questionOne',
      text: '<p>A 15-year old girl presents with a 5-day history of sore throat, low-grade fever, and easy fatigability. Physical examination shows bilateral tonsillar enlargement with exudate. Her spleen is palpable 3 cm below the left costal margin. Her throat culture is negative for group A Streptococcus. Monospot test is positive. Which of the following is the most appropriate management for this patient?</p>',
      field: 'Medicine',
      options: [
        {
          id: 'a',
          alpha: 'a',
          text: 'Abdominal ultrasound'
        },
        {
          id: 'b',
          alpha: 'b',
          text: 'Avoidance of all contact sports'
        },
        {
          alpha: 'c',
          text: 'Complete blood count',
          id: 'c'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 5.</strong><br>This lady has Graves\u2019s disease and the optometrist recognized signs of Graves\u2019s\u2019 ophthalmopathy. Graves\u2019s disease is a form of hyperthyroidism caused by an autoimmune reaction of unknown etiology. The core of treatment is to reduce the production of thyroid hormone by the gland. This can be done by antithyroid drugs, radioactive iodine treatment, or surgery. Usually, the first line of treatment is by drugs either propylthiouracil or methimazole is used. The problem with this lady\u2019s eyes also needed to be treated with surgery to relieve the pressure behind the eyes caused by the infiltrating exophthalmos, which causes the swollen, bulging eyes very often associated with Graves\u2019s disease. It is thought that this exophthalmus is due to common antigens shared by the tissues behind the eye and the thyroid gland; as a result exophthalmus is an almost 100% specific symptom for Graves\u2019s disease. It is estimated that the incidence of Graves\u2019s disease is about 30\u201380 cases per 100,000 individuals, and it affects seven to eight females for every one male. Typically, the incidence peaks between the ages of 20\u201340 years. It is likely that this lady\u2019s primary health care provider did not think Graves\u2019s disease because she was so far outside of the \u201ctypical\u201d range. Had the disease not been discovered and treated it would have continued to ravage her body, possibly even leading to irreversible blindness and/or death.'
    },
    {
      id: 'QuestionTwo',
      text: '<p>A 37 year old florist comes to the employee health clinic for a routine evaluation. He is healthy and without complaints. Five units of tuberculin protein (PPD) is injected intradermally. He returns to the clinic 48-72 hours later. Which of the following would indicate a positive reaction in this patient?</p>',
      field: 'Medicine',
      options: [
        {
          alpha: 'a',
          text: '5 mm of erythema and 5 mm induration',
          id: 'a'
        },
        {
          alpha: 'b',
          text: '10 mm of erythema and 5 mm induration',
          id: 'b'
        },
        {
          alpha: 'c',
          text: '15 mm of erythema and 5 mm induration',
          id: 'c'
        },
        {
          alpha: 'd',
          text: '15 mm of erythema and 15 mm induration',
          id: 'd'
        },
        {
          alpha: 'e',
          text: '0 mm of erythema and 10 mm induration',
          id: 'e'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 4.</strong><br>This patient most likely has had an infarction involving the posterolateral portion of the medulla oblongata as a result of blockage of the posterior inferior cerebellar artery (PICA) on the left side. The condition is also known as Wallenberg syndrome, which might also be caused by occlusion of the vertebral artery. The computerized tomography scan shows no evidence of hemorrhage, and therefore the diagnosis of ischemic infarction is appropriate. Since his condition has been present for less than 3 hours, it is prudent to use a thrombolytic agent <strong>(Choice 4)</strong> as the initial medication. In the thrombolytic system, plasminogen is activated into plasmin by tissue plasminogen activator (tPA); plasmin then further decreases fibrin into degraded peptides. Plasminogen activator must be administered within 3 hours of the onset of the acute event to be efficacious. It is contraindicated if the blood pressure is sustained above l85/ll0. No other antithrombotic treatment should be instituted for 24 hours.'
    },
    {
      id: 'questionThree',
      text: '<p>The cytochrome P450 (CYP) enzyme system is important in the rational prescribing of the psychotropics in clinical practice because its role in metabolism is such that the enzyme system:</p>',
      field: 'Medicine',
      options: [
        {
          alpha: 'a',
          text: 'explains the mechanisms of some drug interactions with antidepressants',
          id: 'a'
        },
        {
          alpha: 'b',
          text: 'increases the lipid solubility of the benzodiazepines',
          id: 'b'
        },
        {
          alpha: 'c',
          text: 'directly enhances the toxicity of lithium carbonate',
          id: 'c'
        },
        {
          alpha: 'd',
          text: "is responsible for the central nervous system 'rush effect' of the psychostimulants",
          id: 'd'
        },
        {
          alpha: 'e',
          text: 'is inhibited by depot antipsychotics.',
          id: 'e'
        }
      ],
      correct_option_explanation:
        '<strong>The correct answer is 5.</strong><br>This patient has symptoms of digitalis toxicity in addition to cardiac failure. Digitalis toxicity leads to vomiting, increasing confusion, hallucinations, photophobia, yellow vision, and cardiac arrhythmias that could be potentially dangerous if left untreated, because supraventricular tachycardia (SVT) and atrioventricular (AV) block could supervene, or even worse, ventricular tachycardia and fibrillation. The presence of SVT and AV block signifies cardiotoxicity. Digitalis toxicity may be precipitated by hypokalemia, and therefore, the serum potassium level should be increased, maintaining it between 4.0 and 5.0 mmol/L. There is a strong possibility the patient is on a loop diuretic (such as furosemide), which restricts sodium and chloride reabsorption in the proximal part of the ascending loop of Henle, with resultant excretion of sodium, water, chloride, and potassium. Digitalis administration should be discontinued temporarily. The serum digitalis level does not correlate with digitalis toxicity.'
    }
    // {
    //   id: 'questionFour',
    //   text: '<p>A 69-year-old man with a known history of coronary artery disease (CAD), atrial fibrillation, and hypertension presents with sudden onset of right facial weakness and numbness. He also complains of a roaring in the right ear. On examination, he has some difficulty with speech. He does not have a pronator drift, and his grip strength is normal. However, there is weakness of the face on the right side, including the orbicularis oculi. He is unable to appreciate taste on the anterior tongue on the right side. He has normal sensations on the face to touch and pinprick. Which of the following would best explain these findings?</p>',
    //   field: 'Medicine',
    //   options: [
    //     {
    //       alpha: 'a',
    //       text: 'Upper motor neuron lesion',
    //       id: 'a'
    //     },
    //     {
    //       alpha: 'b',
    //       text: 'Brainstem glioma',
    //       id: 'b'
    //     },
    //     {
    //       alpha: 'c',
    //       text: 'Left middle cerebral artery embolus',
    //       id: 'c'
    //     },
    //     {
    //       alpha: 'd',
    //       text: 'Hemorrhage within the left internal capsule',
    //       id: 'd'
    //     },
    //     {
    //       alpha: 'e',
    //       text: 'Lower motor neuron lesion',
    //       id: 'e'
    //     }
    //   ],
    //   correct_option_explanation:
    //     '<strong>The correct answer is 5.</strong><br>This patient has a lower motor neuron lesion affecting cranial nerve VII\u2014the facial nerve (CN VII) on the right side\u2014and is also known as Bell\u2019s palsy. Facial palsy is the most common of the cranial neuropathies. Most cases are due to infection with herpes simplex virus and are not idiopathic, as was believed earlier. The facial nerve innervates the muscles of the face and the stapedius muscle in the ear and conveys taste fibers to the anterior two-thirds of the tongue, via the chorda tympani nerve. The roaring in the ear (hyperacusis) and lack of taste in the anterior portion of the tongue are due to involvement of the aforementioned innervation. The problem with speech is due to dysarthria, resulting from paralysis of the muscles around the mouth. The inability to close his eye can put his cornea, and indeed the eye, in danger. Hence, the eyelid should be taped shut or covered with an eye patch. The facial nerve also supplies the lacrimal gland; absence of tears could result in xerophthalmia (corneal drying) and attendant complications, hence artificial tears are necessary. Corticosteroids are helpful. The disorder usually resolves over time. Other causes of lower motor neuron facial paralysis include lesions in the brainstem, cerebellopontine angle, middle ear infection, multiple sclerosis, human immunodeficiency virus (HIV) infection, Lyme disease, parotid tumor tumors, diabetes mellitus, and trauma to the facial nerve.'
    // },
    // {
    //   id: 'QuestionFive',
    //   text: '<p>A 55-year-old woman presents to the emergency room with a history of severe crushing retrosternal chest pain while she was moving some furniture around the house. Electrocardiography shows elevated ST segments in leads II, III, and aVF, consistent with an inferior myocardial infarction. This diagnosis is further supported by cardiac enzymes that test positive. The patient is hemodynamically stable. She is moved to the intensive care unit. A few hours later, she developed tachyarrhythmia. Treatment with intravenous (IV) boluses of lidocaine controls the arrhythmia only transiently\u2014the arrhythmia disappears within 1 minute only to reappear within 4 minutes of each bolus dose. Plasma levels of lidocaine measured soon after each injection remained within the therapeutic range (1\u20135 mg/L). Which of the following statements is most accurate?</p>',
    //   field: 'Medicine',
    //   options: [
    //     {
    //       alpha: 'a',
    //       text: 'Rapid metabolism of lidocaine is responsible for the short duration of its antiarrhythmic action after the bolus administration.',
    //       id: 'a'
    //     },
    //     {
    //       alpha: 'b',
    //       text: 'Laboratory determinations of blood levels of lidocaine after IV administration are frequently in error.',
    //       id: 'b'
    //     },
    //     {
    //       alpha: 'c',
    //       text: 'The elimination half-life of lidocaine is approximately 2 minutes.',
    //       id: 'c'
    //     },
    //     {
    //       alpha: 'd',
    //       text: 'Lidocaine rapidly redistributes from blood to other tissues.',
    //       id: 'd'
    //     },
    //     {
    //       alpha: 'e',
    //       text: 'Cardiac cells rapidly develop tachyphylaxis to lidocaine.',
    //       id: 'e'
    //     }
    //   ],
    //   correct_option_explanation:
    //     '<strong>The correct answer is 4.</strong><br>Rapid (but temporary) control of arrhythmia follows achievement of a therapeutic blood level of lidocaine. The temporary nature occurs because lidocaine rapidly redistributes from blood to other tissues. In this situation, the reappearance of the arrhythmia reflects the rapid distribution of lidocaine from the blood to highly perfused body tissues, resulting in a decrease in plasma concentration of the drug below therapeutic levels. A similar process, involving redistribution of thiopental from the brain to other highly perfused tissues, is responsible for termination of the anesthetic effects of the intravenous (IV) barbiturate.'
    // }
  ]
}
