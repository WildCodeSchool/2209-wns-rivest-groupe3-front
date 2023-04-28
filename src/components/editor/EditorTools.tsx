import { Dispatch, SetStateAction } from 'react'
import { IArticle } from '../../utils/interfaces/Interfaces'
import ImageHandler from '../imagehandler/ImageHandler'

const EditorTools = ({
  handleSave,
  title,
  setTitle,
  isNew,
  contentVersion,
  article,
  setContentVersion,
  coverUrl,
  setCoverUrl,
  blogId,
}: {
  handleSave: ({ publish }: { publish: boolean }) => void
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  isNew: boolean
  contentVersion?: number
  article?: IArticle
  setContentVersion?: Dispatch<SetStateAction<number>>
  coverUrl?: string | null
  setCoverUrl?: Dispatch<SetStateAction<string | null>>
  blogId?: string
}) => {
  return (
    <div className="fixed top-12 left-0 mr-auto ml-3 flex items-center gap-3 z-10 flex-col bg-white px-8">
      <div className="flex items-center gap-3">
        <button
          className="btn btn-info mt-10"
          onClick={() => handleSave({ publish: false })}
        >
          {isNew ? <>Enregistrer</> : <>Marquer</>}
          <br />
          comme brouillon
        </button>
        <button
          className="btn btn-primary mt-10"
          onClick={() => handleSave({ publish: true })}
        >
          Publier
        </button>
      </div>
      <div className="flex items-center flex-col">
        <label htmlFor="title">Titre de l'article</label>
        <input
          type="text"
          className="border border-neutral rounded p-1 text-center"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {!isNew &&
        article !== undefined &&
        setContentVersion !== undefined &&
        setCoverUrl !== undefined && (
          <>
            <div className="mt-2">
              <em>Version du contenu de l'article : </em>
              <select
                name="version"
                value={contentVersion}
                onChange={(e) => setContentVersion(parseInt(e.target.value))}
              >
                {article.articleContent.map((articleContentVersions) => (
                  <option
                    key={articleContentVersions.id}
                    value={articleContentVersions.version}
                  >
                    {articleContentVersions.version}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Image de couverture :</h3>
              <ImageHandler
                type="article"
                imgUrl={coverUrl}
                articleId={article.id}
                blogId={blogId}
                updateBackendUrlImg={async (imageUrl) => {
                  await setCoverUrl(imageUrl)
                }}
              />
            </div>
          </>
        )}
    </div>
  )
}

export default EditorTools
