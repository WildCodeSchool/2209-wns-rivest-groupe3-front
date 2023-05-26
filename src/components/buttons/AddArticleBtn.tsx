

const AddArticleBtn = ({ addArticle }: { addArticle: () => void }) => {
  return (
    <button className="btn btn-info" onClick={addArticle}>
      Ajouter un article
    </button>
  )
}

export default AddArticleBtn
