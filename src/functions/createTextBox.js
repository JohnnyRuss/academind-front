import { fixLineBreaks } from './';

export default function createParagraphs({ str, id, parentClass, childClass }) {
  if (!str || typeof str !== 'string') return;

  const val = fixLineBreaks(str);

  return (
    <div key={`generated-p-box${id}`} className={parentClass}>
      {val.split('</br>').map((node, i) => {
        return (
          <p key={`generated-p-${id}-${i}`} className={childClass}>
            {node}
          </p>
        );
      })}
    </div>
  );
}
