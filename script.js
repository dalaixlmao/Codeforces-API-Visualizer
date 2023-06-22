document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetchBtn');
    const handleInput = document.getElementById('handleInput');
  
    fetchBtn.addEventListener('click', () => {
      const handle = handleInput.value;
      fetchData(handle);
    });
  
    const fetchData = async (handle) => {
      try {
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const data = await response.json();
        if (data.status === "OK") {
          const submissions = data.result;
          visualizeData(submissions);
        } else {
          console.log(data.comment);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const visualizeData = (submissions) => {
      const tags = {};
      const ratings = {};
  
      submissions.forEach((submission) => {
        const problem = submission.problem;
        if (problem) {
          const problemTags = problem.tags;
          const problemRating = problem.rating;
          
          if (problemTags) {
            problemTags.forEach((tag) => {
              tags[tag] = tags[tag] ? tags[tag] + 1 : 1;
            });
          }
    
          if (problemRating) {
            ratings[problemRating] = ratings[problemRating] ? ratings[problemRating] + 1 : 1;
          }
        }
      });
  
      createTagChart(tags);
      createRatingChart(ratings);
    };
  
    const createTagChart = (tags) => {
      const tagChartCanvas = document.getElementById('tagChart').getContext('2d');
      const labels = Object.keys(tags);
      const data = Object.values(tags);
  
      new Chart(tagChartCanvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Number of Questions',
              data: data,
              backgroundColor: '#007bff'
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    };
  
    const createRatingChart = (ratings) => {
      const ratingChartCanvas = document.getElementById('ratingChart').getContext('2d');
      const labels = Object.keys(ratings);
      const data = Object.values(ratings);
  
      new Chart(ratingChartCanvas, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Number of Questions',
              data: data,
              backgroundColor: [
                '#007bff',
                '#28a745',
                '#dc3545',
                '#ffc107',
                '#17a2b8',
                '#6c757d',
                '#6610f2'
              ]
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    };
  });
  