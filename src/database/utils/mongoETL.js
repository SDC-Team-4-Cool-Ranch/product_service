// COMMAND TO COPY TO DATABASE FIRST:
// mongoimport --type csv --headerline --db products --collection related --file 'src/database/csv/related.csv'

// Aggregate products
// db.products.aggregate(
//   [
//     {
//       $lookup: {
//         from: 'features',
//         localField: 'id',
//         foreignField: 'product_id',
//         as: 'features',
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         id: 1,
//         name: 1,
//         slogan: 1,
//         description: 1,
//         category: 1,
//         default_price: 1,
//         features: {
//           $map: {
//             input: '$features',
//             as: 'feature',
//             in: {
//               feature: '$$feature.feature',
//               value: '$$feature.value',
//             },
//           },
//         },
//       },
//     },
//     { $out: 'products_features' },
//   ],
//   { allowDiskUse: true }
// );

// Aggregate styles
// Can create an index to make aggregation faster then remove
// db.styles.aggregate(
//   [
//     {
//       $lookup: {
//         from: 'skus',
//         localField: 'id',
//         foreignField: 'styleId',
//         as: 'skus',
//       },
//     },
//     {
//       $lookup: {
//         from: 'photos',
//         localField: 'id',
//         foreignField: 'style_id',
//         as: 'photos',
//       },
//     },
//     {
//       $project: {
//         id: 1,
//         product_id: '$productId',
//         name: 1,
//         sale_price: 1,
//         original_price: 1,
//         default_style: 1,
//         skus: {
//           $map: {
//             input: '$skus',
//             as: 'sku',
//             in: {
//               size: '$$sku.size',
//               quantity: '$$sku.quantity',
//             },
//           },
//         },
//         photos: {
//           $map: {
//             input: '$photos',
//             as: 'photo',
//             in: {
//               thumbnail_url: '$$photo.thumbnail_url',
//               url: '$$photo.url',
//             },
//           },
//         },
//       },
//     },
//     {
//       $out: 'styles_skus_photos',
//     },
//   ],
//   { allowDiskUse: true }
// );

// Aggregate related
// db.related.aggregate([
//   {
//     $group: {
//       _id: '$current_product_id',
//       related_product_ids: { $push: '$related_product_id' },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       product_id: '$_id',
//       related_product_ids: 1,
//     },
//   },
//   { $out: 'related_products' },
// ]);
