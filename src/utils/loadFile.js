export async function loadFile(filePath) {
  try {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors du chargement du fichier ${filePath} :`, error);
    return null;
  }
}
