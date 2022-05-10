import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";

export default function useAnswers(videoID) {
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoID + "/questions");
      const answerQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          if (mountedRef.current) {
            setAnswers((prevAnswers) => {
              return [...prevAnswers, ...Object.values(snapshot.val())];
            });
          }
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}
