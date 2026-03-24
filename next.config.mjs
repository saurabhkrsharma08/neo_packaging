/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {

    sassOptions: {
      includePaths: [path.join(__dirname, 'node_modules')],
      quietDeps: true, // 👈 hides warnings from node_modules
    },
    async redirects() {
    return [
      {
        source: '/types-of-assembly-line-conveyor',
        destination: '/products/assembly-line-conveyors',
        permanent: true,
      },
      {
        source: '/continuous-bucket-elevators-a-fundamental-maintenance-guide',
        destination: '/products/continuous-discharge-bucket-elevators',
        permanent: true,
      },
      {
        source: '/mixer-and-blender-conveyors',
        destination: '/products/mixer-and-blender-conveyors',
        permanent: true,
      },
      {
        source: '/products/screw-conveyors/u-trough-screw-conveyors/u-trough-screw-converyor',
        destination: '/products/screw-conveyors',
        permanent: true,
      },
      {
        source: '/enquiry',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/products/belt-conveyors/assembly-line-conveyors',
        destination: '/products/assembly-line-conveyors',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products/belt-conveyors/horizontal-belt-conveyor/neo-trough-belt-conveyors',
        destination: '/products/horizontal-belt-conveyor',
        permanent: true,
      },
      {
        source: '/products/belt-conveyors/inclined-belt-conveyor/cleated-inclined-belt-conveyor',
        destination: '/products/inclined-belt-conveyor',
        permanent: true,
      },
      {
        source: '/magnetic-conveyor',
        destination: '/products/magnetic-conveyor',
        permanent: true,
      },
      {
        source: '/products/roller-conveyors/powered-roller-conveyors',
        destination: '/products/roller-conveyors',
        permanent: true,
      },
      {
        source: '/tag/top-10-drag-chain-conveyors-manufacturer-in-delhi-india',
        destination: '/blogs/drag-chain-conveyors-manufacturer-india',
        permanent: true,
      },
      {
        source: '/products/screw-conveyors/u-trough-screw-conveyors',
        destination: '/products/u-trough-screw-conveyors',
        permanent: true,
      },
      {
        source: '/products/bucket-elevator/continuous-discharge-bucket-elevators',
        destination: '/products/continuous-discharge-bucket-elevators',
        permanent: true,
      },
      {
        source: '/different-ways-of-material-discharging-by-bucket-elevator',
        destination: '/blogs/different-ways-of-material-discharging-by-bucket-elevator',
        permanent: true,
      },
      {
        source: '/bucket-elevator-problems-and-solutions',
        destination: '/blogs/bucket-elevator-problems-and-solutions',
        permanent: true,
      },
      {
        source: '/multi-functional-chain-conveyors',
        destination: '/blogs/multi-functional-chain-conveyors',
        permanent: true,
      },
      {
        source: '/products/belt-conveyors/horizontal-belt-conveyor/slider-bed-horizontal-belt-conveyor',
        destination: '/products/slider-bed-horizontal-belt-conveyor',
        permanent: true,
      },
      {
        source: '/benefits-of-bucket-conveyors',
        destination: '/blogs/benefits-of-bucket-conveyors',
        permanent: true,
      },
      {
        source: '/products/bucket-elevator/centrifugal-discharge-bucket-elevators',
        destination: '/products/centrifugal-discharge-bucket-elevators',
        permanent: true,
      },
      {
        source: '/contacts',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/products/screw-conveyors/shaftless-screw-conveyors',
        destination: '/products/shaftless-screw-conveyors',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/screw-conveyors-manufacturer-in-indore-bhopal-gwalior-mp',
        destination: '/blogs/screw-conveyors-manufacturer-in-indore-bhopal-gwalior-mp',
        permanent: true,
      },
      {
        source: '/how-to-find-a-reliable-manufacturer-of-industrial-material-handling-equipment',
        destination: '/blogs/how-to-find-reliable-industrial-material-handling-conveyors',
        permanent: true,
      },
      {
        source: '/products/belt-conveyors/horizontal-belt-conveyor/slider-bed-horizontal-belt-conveyor/4',
        destination: '/products/slider-bed-horizontal-belt-conveyor',
        permanent: true,
      },
      {
        source: '/petcoke-handling-with-the-help-of-bucket-elevator',
        destination: '/blogs/%20pet_coke_handling_with_the_help_of_bucket_elevator_system',
        permanent: true,
      },
      {
        source: '/a-tailor-made-affordable-conveyor-system',
        destination: '/blogs/a-tailor-made-affordable-conveyor-system',
        permanent: true,
      },
      {
        source: '/neo1/mixer-and-blender-conveyors/ribbon-blender',
        destination: '/products/mixer-and-blender-conveyors',
        permanent: true,
      },
      {
        source: '/neo1/multi-functional-chain-conveyors',
        destination: '/blogs/multi-functional-chain-conveyors',
        permanent: true,
      },
      {
        source: '/featured/loading-unloading-conveyors',
        destination: '/blogs/loading-unloading-conveyors',
        permanent: true,
      },
      {
        source: '/neo1/what-are-bucket-elevators',
        destination: '/blogs/what-are-bucket-elevators',
        permanent: true,
      },
      {
        source: '/neo1/products/conveyor-idlers',
        destination: '/products/conveyor-idlers',
        permanent: true,
      },
      {
        source: '/neo1/inspection-conveyors',
        destination: '/products/inspection-conveyors',
        permanent: true,
      },
      {
        source: '/neo1/enquiry',
        destination: '/faqs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
