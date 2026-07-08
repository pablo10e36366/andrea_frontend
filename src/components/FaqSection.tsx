import type { FaqItem } from '../data/siteContent'

type FaqSectionProps = {
  items: FaqItem[]
  openFaq: number | null
  onToggle: (index: number) => void
}

export function FaqSection({ items, openFaq, onToggle }: FaqSectionProps) {
  return (
    <section id="detail-faq" className="section">
      <h2>💭 Preguntas frecuentes</h2>

      <div className="card">
        {items.map((item, index) => (
          <div key={item.question}>
            <div className={`acc${openFaq === index ? ' open' : ''}`}>
              <button className="acc__q" type="button" onClick={() => onToggle(index)}>
                {item.question}
              </button>
              {openFaq === index && (
                <div className="acc__a">
                  {item.type === 'paragraph' && item.text ? <p>{item.text}</p> : null}
                  {item.type === 'ordered' && item.items ? (
                    <ol className="list">
                      {item.items.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ol>
                  ) : null}
                  {item.type === 'unordered' && item.items ? (
                    <ul className="list">
                      {item.items.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}
            </div>
            {index < items.length - 1 ? <div className="line"></div> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
