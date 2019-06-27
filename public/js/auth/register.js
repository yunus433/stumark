window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const universityList = [
    "123 Studiengänge ▪ 11 Erfahrungsberichte",
    "53 Studiengänge ▪ 4 Erfahrungsberichte",
    "Albert-Ludwigs-Universität Freiburg",
    "Bard College Berlin, A Liberal Arts University",
    "Bauhaus-Universität Weimar",
    "Bergische Universität Wuppertal",
    "Brandenburgische Technische Universität Cottbus-Senftenberg",
    "Bucerius Law School",
    "Carl von Ossietzky Universität Oldenburg",
    "Charité - Universitätsmedizin Berlin",
    "Christian-Albrechts-Universität zu Kiel",
    "Deutsche Sporthochschule Köln",
    "Deutsche Universität für Verwaltungswissenschaften Speyer",
    "Dresden International University",
    "Eberhard Karls Universität Tübingen",
    "EBS Universität für Wirtschaft und Recht",
    "ESCP Europe Wirtschaftsschule",
    "Europa-Universität Flensburg",
    "Europa-Universität Viadrina Frankfurt (Oder)",
    "European School of Management and Technology",
    "FernUniversität in Hagen",
    "Filmuniversität Babelsberg Konrad Wolf",
    "Folkwang Universität der Künste",
    "Frankfurt School of Finance & Management",
    "Freie Hochschule Stuttgart – Seminar für Waldorfpädagogik",
    "Freie Universität Berlin",
    "Friedrich-Alexander-Universität Erlangen-Nürnberg",
    "Friedrich-Schiller-Universität Jena",
    "Georg-August-Universität Göttingen",
    "HafenCity Universität Hamburg",
    "Heinrich-Heine-Universität Düsseldorf",
    "Helmut-Schmidt-Universität – Universität der Bundeswehr Hamburg",
    "Hertie School of Governance",
    "Hochschule für Philosophie München",
    "Hochschule für Politik München – Bavarian School of Public Policy",
    "Humboldt-Universität zu Berlin",
    "International Psychoanalytic University Berlin",
    "Jacobs University Bremen",
    "Johann Wolfgang Goethe-Universität Frankfurt am Mai",
    "Johannes-Gutenberg-Universität Mainz",
    "Julius-Maximilians-Universität Würzburg",
    "Justus-Liebig-Universität Gießen",
    "Karlsruher Institut für Technologie",
    "Katholische Universität Eichstätt-Ingolstadt",
    "Kühne Logistics University - Wissenschaftliche Hochschule für Logistik und Unternehmensführung",
    "Leibniz Universität Hannover",
    "Leipzig Graduate School of Management",
    "Leuphana Universität Lüneburg",
    "Ludwig-Maximilians-Universität München",
    "Martin-Luther-Universität Halle-Wittenberg",
    "Medizinische Hochschule Brandenburg Theodor Fontane",
    "Medizinische Hochschule Hannover",
    "MSH Medical School Hamburg",
    "Otto von Guericke-Universität Magdeburg",
    "Otto-Friedrich-Universität Bamberg",
    "Pädagogische Hochschule Freiburg",
    "Pädagogische Hochschule Heidelberg",
    "Pädagogische Hochschule Karlsruhe",
    "Pädagogische Hochschule Ludwigsburg",
    "Pädagogische Hochschule Schwäbisch Gmünd",
    "Pädagogische Hochschule Weingarten",
    "Philipps-Universität Marburg",
    "Psychologische Hochschule Berlin",
    "Rheinisch-Westfälische Technische Hochschule Aachen",
    "Rheinische Friedrich-Wilhelms-Universität Bonn",
    "Ruhr-Universität Bochum",
    "Ruprecht-Karls-Universität Heidelberg",
    "Steinbeis-Hochschule Berlin",
    "Stiftung Tierärztliche Hochschule Hannover",
    "Stiftung Universität Hildesheim",
    "Technische Universität Bergakademie Freiberg",
    "Technische Universität Berlin",
    "Technische Universität Carolo-Wilhelmina zu Braunschweig",
    "Technische Universität Chemnitz",
    "Technische Universität Clausthal",
    "Technische Universität Darmstadt",
    "Technische Universität Dortmund",
    "Technische Universität Dresden",
    "Technische Universität Hamburg",
    "Technische Universität Ilmenau",
    "Technische Universität Kaiserslautern",
    "Technische Universität München",
    "Universität Augsburg",
    "Universität Bayreuth",
    "Universität Bremen",
    "Universität der Bundeswehr München",
    "Universität der Künste Berlin",
    "Universität des Saarlandes",
    "Universität Duisburg-Essen",
    "Universität Erfurt",
    "Universität Greifswald",
    "Universität Hamburg",
    "Universität Hohenheim",
    "Universität Kassel",
    "Universität Koblenz-Landau",
    "Universität Konstanz",
    "Universität Leipzig",
    "Universität Mannheim",
    "Universität Osnabrück",
    "Universität Paderborn",
    "Universität Passau",
    "Universität Potsdam",
    "Universität Regensburg",
    "Universität Rostock",
    "Universität Siegen",
    "Universität Stuttgart",
    "Universität Trier",
    "Universität Ulm",
    "Universität Vechta",
    "Universität Witten/Herdecke",
    "Universität zu Köln",
    "Universität zu Lübeck",
    "Westfälische Wilhelms-Universität Münster",
    "WHU - Otto Beisheim School of Management",
    "Zeppelin Universität"
  ]

  const universityInput = document.getElementById('university-input');
  const universityValueWrapper = document.querySelector('.university-input-values');

  document.addEventListener('click', (event) => {
    if (event.target.className == 'input-value-each-span') {
      universityInput.value = event.target.innerHTML;
    }

    if (event.target.id == 'university-input') {
      universityValueWrapper.style.display = 'flex';
    } else {
      universityValueWrapper.style.display = 'none';
    }
  });

  universityInput.oninput = (event) => {
    if (universityInput.value) {
      universityValueWrapper.innerHTML = "";
      universityList.forEach(university => {
        if (university.indexOf(universityInput.value) !== -1) {
          const newSpan = document.createElement('span');
          newSpan.classList.add('input-value-each-span');
          newSpan.innerHTML = university;
          universityValueWrapper.appendChild(newSpan);
        }
      });
      responsiveDesign(universityValueWrapper);
    } else {
      universityValueWrapper.innerHTML = "";
      universityList.forEach(university => {
        const newSpan = document.createElement('span');
        newSpan.classList.add('input-value-each-span');
        newSpan.innerHTML = university;
        universityValueWrapper.appendChild(newSpan);
      });
      responsiveDesign(universityValueWrapper);
    };
  };

  const form = document.querySelector('.form-wrapper');
  const error = document.querySelector('.each-error-line');
  form.onsubmit = (event) => {
    event.preventDefault();
    
    if (universityList.indexOf(universityInput.value) === -1) {
      error.innerHTML = 'Please select a valid university';
    }
    else if (document.getElementById('password-input-one').value.length < 6 || document.getElementById('password-input-two').value.length < 6) {
      error.innerHTML = 'Your password should be longer than 5 digits';
    }
    else if (document.getElementById('password-input-one').value != document.getElementById('password-input-two').value) {
      error.innerHTML = 'Please confirm your password';
    }
    else {
      form.submit();
    }
  }
}
