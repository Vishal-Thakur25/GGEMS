import ProgrammeDetailPage, {
  generateMetadata as generateMeta,
  generateStaticParams as generateParams,
} from '../../programmes/[slug]/page';

export const revalidate = 60;
export const generateMetadata = generateMeta;
export const generateStaticParams = generateParams;
export default ProgrammeDetailPage;
