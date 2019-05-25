const filterRelevant = (input) => {
  const data = [];

  input.forEach((el) => {
    data.push({
      id: el.id,
      name: el.name,
      description: el.description ? el.description : "This repo doesn't have a description",
      owner : el.owner['login'],
      ownerUrl: el.owner['html_url'],
      repoUrl: el['html_url'],
      lastUpdate: el['updated_at'],
    });
  });
  return data;
};

module.exports = { filterRelevant };
