import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

export default async function BrainLayout({ children }) {
  const preview = (await draftMode()).isEnabled;

  return (
    <>
      {children}
      {preview && <VisualEditing />}
    </>
  );
}
