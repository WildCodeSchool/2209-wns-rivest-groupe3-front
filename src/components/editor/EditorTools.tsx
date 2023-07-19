import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IArticle } from '../../utils/interfaces/Interfaces'
import ImageHandler from '../imagehandler/ImageHandler'
import { TbEditCircle } from 'react-icons/tb'
import { CgClose } from 'react-icons/cg'

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
  setNewContentVersion,
  setEdit,
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
  setNewContentVersion?: Dispatch<SetStateAction<number>>
  setEdit?: Dispatch<SetStateAction<boolean>>
}) => {
  const [versionToDisplay, setVersionToDisplay] = useState(contentVersion)
  const [showTools, setShowTools] = useState(false)
  return (
    <div className="fixed top-50 mt-2 left-10  flex items-center gap-3 z-10 flex-col bg-white px-8 border py-2 rounded-md shadow-md">
      {!showTools ? (
        <div onClick={() => setShowTools(true)} className="cursor-pointer">
          <TbEditCircle size={'1.5rem'} />
        </div>
      ) : (
        <>
          <div
            onClick={() => setShowTools(false)}
            className="cursor-pointer mr-auto"
          >
            <CgClose size={'1.5rem'} />
          </div>
          <div className="flex items-center gap-3 ">
            <button
              className="btn btn-info"
              onClick={() => handleSave({ publish: false })}
            >
              {isNew ? <>Enregistrer</> : <>Marquer</>}
              <br />
              comme brouillon
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSave({ publish: true })}
            >
              {isNew ? <>Publier</> : <>Sauvegarder</>}
            </button>
          </div>
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => handleSave({ publish: true })}
            >
              Annuler
            </button>
          </div>
          <hr className="mx-3 w-full" />
          <div className="flex items-center flex-col">
            <label htmlFor="title">Titre de l'article</label>
            <input
              type="text"
              className="border border-neutral rounded p-1 text-center"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <hr className="mx-3 w-full" />
          {!isNew &&
            versionToDisplay !== undefined &&
            article !== undefined &&
            setContentVersion !== undefined &&
            setCoverUrl !== undefined &&
            setNewContentVersion !== undefined && (
              <>
                <div className="mt-2">
                  <em>Version du contenu : </em>
                  {versionToDisplay >
                  Math.max(
                    ...article.articleContent.map((content) => content.version)
                  ) ? (
                    <span>{versionToDisplay}</span>
                  ) : (
                    <select
                      name="version"
                      value={contentVersion}
                      onChange={(e) =>
                        setContentVersion(parseInt(e.target.value))
                      }
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
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const newVersionNumber =
                        Math.max(
                          ...article.articleContent.map(
                            (content) => content.version
                          )
                        ) + 1
                      setNewContentVersion(newVersionNumber)
                      setVersionToDisplay(newVersionNumber)
                    }}
                  >
                    Créer une nouvelle version
                  </button>
                </div>
                <hr className="mx-3 w-full" />
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    Image de couverture :
                  </h3>
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
        </>
      )}
    </div>
  )
}

export default EditorTools
