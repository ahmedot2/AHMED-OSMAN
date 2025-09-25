import SectionWrapper from '../SectionWrapper';

export default function Footer() {
  return (
    <SectionWrapper id="footer" className="bg-gradient-to-t from-gray-900/50 to-black justify-end items-center text-center py-8">
        <div className="text-center w-full text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} Ahmed Osman. All Rights Reserved.</p>
        </div>
    </SectionWrapper>
  );
}
