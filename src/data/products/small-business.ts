import { Product } from "./index";

export const smallBusinessProducts: Product[] = [
  // Skincare Products
  {
    id: "sb1",
    title: "Brightening Vitamin C Serum",
    description: "Powerful antioxidant serum that brightens skin and reduces dark spots",
    price: "$38",
    category: "skincare",
    brand: "Honeybell Skincare",
    business_size: "<20 employees",
    target_demographic: "All skin types, especially dull or uneven skin",
    key_ingredients: ["15% Vitamin C", "Ferulic Acid", "Hyaluronic Acid", "Vitamin E"],
    primary_benefits: ["Brightens complexion", "Reduces hyperpigmentation", "Boosts collagen production"],
    link: "https://honeybellskincare.com",
    url: "https://honeybellskincare.com/products/vitamin-c-serum",
    certifications: ["Cruelty-Free", "Vegan", "Women-Owned"],
    business_tags: ["BIPOC-Owned", "Women-Owned"]
  },
  {
    id: "sb2",
    title: "Blue Tansy Facial Oil",
    description: "Calming facial oil for sensitive and reactive skin types",
    price: "$45",
    category: "skincare",
    brand: "Wild Herbs Apothecary",
    business_size: "<10 employees",
    target_demographic: "Sensitive, acne-prone, and reactive skin",
    key_ingredients: ["Blue Tansy Oil", "Jojoba Oil", "Evening Primrose Oil", "Vitamin E"],
    primary_benefits: ["Reduces redness", "Calms inflammation", "Balances oil production"],
    link: "https://wildherbsapothecary.com",
    url: "https://wildherbsapothecary.com/products/blue-tansy-facial-oil",
    certifications: ["Organic", "Cruelty-Free", "Handcrafted"],
    business_tags: ["Sustainable", "Eco-Friendly"]
  },
  {
    id: "sb3",
    title: "Enzyme Exfoliating Mask",
    description: "Gentle fruit enzyme mask that dissolves dead skin cells",
    price: "$34",
    category: "skincare",
    brand: "Terracotta Beauty",
    business_size: "<15 employees",
    target_demographic: "All skin types, especially dull or congested skin",
    key_ingredients: ["Papaya Enzymes", "Pineapple Extract", "Kaolin Clay", "Aloe Vera"],
    primary_benefits: ["Gently exfoliates", "Brightens complexion", "Unclogs pores"],
    link: "https://terracottabeauty.com",
    url: "https://terracottabeauty.com/products/enzyme-exfoliating-mask",
    certifications: ["Cruelty-Free", "Made in USA"],
    business_tags: ["BIPOC-Owned", "Artisanal"]
  },
  
  // Makeup Products
  {
    id: "sb4",
    title: "Botanical Cream Blush",
    description: "Nourishing cream blush made with plant-based ingredients",
    price: "$24",
    category: "makeup",
    brand: "Fern & Petal",
    business_size: "<25 employees",
    target_demographic: "All skin types, especially dry skin",
    key_ingredients: ["Shea Butter", "Jojoba Oil", "Plant Pigments", "Vitamin E"],
    primary_benefits: ["Natural flush of color", "Hydrates skin", "Buildable coverage"],
    link: "https://fernandpetal.com",
    url: "https://fernandpetal.com/products/botanical-cream-blush",
    certifications: ["Vegan", "Cruelty-Free", "Plastic-Free Packaging"],
    business_tags: ["Women-Owned", "Eco-Friendly"]
  },
  {
    id: "sb5",
    title: "Mineral Foundation Powder",
    description: "Lightweight mineral foundation with SPF 20 protection",
    price: "$32",
    category: "makeup",
    brand: "Terra Beauty",
    business_size: "<20 employees",
    target_demographic: "All skin types, especially sensitive or acne-prone",
    key_ingredients: ["Zinc Oxide", "Titanium Dioxide", "Iron Oxides", "Mica"],
    primary_benefits: ["Natural coverage", "Sun protection", "Won't clog pores"],
    link: "https://terrabeauty.co",
    url: "https://terrabeauty.co/products/mineral-foundation",
    certifications: ["Non-Comedogenic", "Dermatologist Tested"],
    business_tags: ["BIPOC-Owned", "Clean Beauty"]
  },
  {
    id: "sb6",
    title: "Hemp Seed Brow Pomade",
    description: "Long-wearing eyebrow pomade enriched with hemp seed oil",
    price: "$18",
    category: "makeup",
    brand: "Green Ritual",
    business_size: "<15 employees",
    target_demographic: "All skin types, especially those seeking clean beauty",
    key_ingredients: ["Hemp Seed Oil", "Candelilla Wax", "Vitamin E", "Natural Pigments"],
    primary_benefits: ["Defines brows", "Conditions hair", "Water-resistant"],
    link: "https://greenritualbeauty.com",
    url: "https://greenritualbeauty.com/products/hemp-brow-pomade",
    certifications: ["Vegan", "Cruelty-Free"],
    business_tags: ["Sustainable", "Clean Beauty"]
  },
  
  // Haircare Products
  {
    id: "sb7",
    title: "Scalp Revival Treatment",
    description: "Clarifying scalp treatment that removes buildup and soothes irritation",
    price: "$28",
    category: "haircare",
    brand: "Root & Ritual",
    business_size: "<10 employees",
    target_demographic: "All hair types, especially those with dry or itchy scalp",
    key_ingredients: ["Tea Tree Oil", "Peppermint", "Apple Cider Vinegar", "Aloe Vera"],
    primary_benefits: ["Removes buildup", "Soothes irritation", "Balances scalp pH"],
    link: "https://rootandritual.com",
    url: "https://rootandritual.com/products/scalp-revival-treatment",
    certifications: ["Sulfate-Free", "Silicone-Free"],
    business_tags: ["Women-Owned", "Clean Beauty"]
  },
  {
    id: "sb8",
    title: "Argan Oil Hair Serum",
    description: "Nourishing hair serum that tames frizz and adds shine",
    price: "$26",
    category: "haircare",
    brand: "Luna Nectar",
    business_size: "<15 employees",
    target_demographic: "Dry, damaged, or frizzy hair",
    key_ingredients: ["Argan Oil", "Jojoba Oil", "Vitamin E", "Rose Extract"],
    primary_benefits: ["Reduces frizz", "Adds shine", "Protects from heat damage"],
    link: "https://lunanectar.com",
    url: "https://lunanectar.com/products/argan-oil-hair-serum",
    certifications: ["Cruelty-Free", "Vegan"],
    business_tags: ["Women-Owned", "Sustainable"]
  },
  
  // Body Care Products
  {
    id: "sb9",
    title: "Coffee Body Scrub",
    description: "Exfoliating body scrub made with used coffee grounds and coconut oil",
    price: "$22",
    category: "bodycare",
    brand: "Upcycle Beauty",
    business_size: "<10 employees",
    target_demographic: "All skin types, especially those with dry or dull skin",
    key_ingredients: ["Recycled Coffee Grounds", "Coconut Oil", "Brown Sugar", "Shea Butter"],
    primary_benefits: ["Exfoliates dead skin", "Improves circulation", "Moisturizes"],
    link: "https://upcyclebeauty.com",
    url: "https://upcyclebeauty.com/products/coffee-body-scrub",
    certifications: ["Zero-Waste", "Plastic-Free Packaging"],
    business_tags: ["Eco-Friendly", "Sustainable"]
  },
  {
    id: "sb10",
    title: "Whipped Body Butter",
    description: "Rich, deeply moisturizing body butter for extremely dry skin",
    price: "$28",
    category: "bodycare",
    brand: "Bloom & Nourish",
    business_size: "<5 employees",
    target_demographic: "Very dry, sensitive, or eczema-prone skin",
    key_ingredients: ["Shea Butter", "Cocoa Butter", "Mango Butter", "Jojoba Oil"],
    primary_benefits: ["Intense hydration", "Relieves dry patches", "Non-greasy formula"],
    link: "https://bloomandnourish.com",
    url: "https://bloomandnourish.com/products/whipped-body-butter",
    certifications: ["Cruelty-Free", "Handmade"],
    business_tags: ["BIPOC-Owned", "Women-Owned"]
  },
  
  // Sustainable Beauty
  {
    id: "sb11",
    title: "Refillable Lip Color Pods",
    description: "Sustainable lip color system with refillable pods to reduce waste",
    price: "$32 (case) / $18 (refill)",
    category: "sustainable beauty",
    brand: "Round Beauty",
    business_size: "<20 employees",
    target_demographic: "All skin types, especially eco-conscious consumers",
    key_ingredients: ["Plant Oils", "Natural Waxes", "Mineral Pigments", "Vitamin E"],
    primary_benefits: ["Rich color", "Moisturizing formula", "Reduces plastic waste"],
    link: "https://roundbeauty.com",
    url: "https://roundbeauty.com/products/refillable-lip-pods",
    certifications: ["Plastic Negative", "Cruelty-Free", "Vegan"],
    business_tags: ["Sustainable", "Eco-Friendly"]
  },
  {
    id: "sb12",
    title: "Compostable Face Wipes",
    description: "Plant-based, compostable face wipes that break down in 6 weeks",
    price: "$16",
    category: "sustainable beauty",
    brand: "Pure Earth",
    business_size: "<15 employees",
    target_demographic: "All skin types, especially eco-conscious consumers",
    key_ingredients: ["Bamboo Fiber", "Aloe Vera", "Chamomile", "Cucumber Extract"],
    primary_benefits: ["Effectively removes makeup", "Gentle on skin", "Eco-friendly disposal"],
    link: "https://pureearthbeauty.com",
    url: "https://pureearthbeauty.com/products/compostable-face-wipes",
    certifications: ["Compostable", "Biodegradable", "FSC Certified"],
    business_tags: ["Zero-Waste", "Sustainable"]
  },
  
  // College Products
  {
    id: "sb13",
    title: "On-the-Go Beauty Kit",
    description: "Compact multi-use beauty kit perfect for busy college students",
    price: "$34",
    category: "products for college kids",
    brand: "Busy Beauty",
    business_size: "<10 employees",
    target_demographic: "Young adults with busy lifestyles",
    key_ingredients: ["Shea Butter", "Jojoba Oil", "Mineral Pigments", "Aloe Vera"],
    primary_benefits: ["Multi-purpose products", "Space-saving design", "Quick application"],
    link: "https://busybeauty.co",
    url: "https://busybeauty.co/products/on-the-go-kit",
    certifications: ["Cruelty-Free", "Travel-Friendly"],
    business_tags: ["Women-Owned", "Clean Beauty"]
  },
  {
    id: "sb14",
    title: "Acne Spot Treatment Patches",
    description: "Hydrocolloid patches that reduce acne overnight while you sleep",
    price: "$14",
    category: "products for college kids",
    brand: "Clear Day",
    business_size: "<15 employees",
    target_demographic: "Acne-prone skin, especially students under stress",
    key_ingredients: ["Hydrocolloid", "Tea Tree Oil", "Salicylic Acid", "Niacinamide"],
    primary_benefits: ["Reduces inflammation", "Extracts impurities", "Prevents picking"],
    link: "https://cleardayskin.com",
    url: "https://cleardayskin.com/products/acne-patches",
    certifications: ["Dermatologist Tested", "Non-Comedogenic"],
    business_tags: ["BIPOC-Owned", "Clean Beauty"]
  },
  
  // Products for Acne
  {
    id: "sb15",
    title: "Clarifying Clay Mask",
    description: "Detoxifying clay mask that draws out impurities and excess oil",
    price: "$24",
    category: "products for acne",
    brand: "Bare Minerals Co.",
    business_size: "<20 employees",
    target_demographic: "Oily and acne-prone skin",
    key_ingredients: ["Bentonite Clay", "Tea Tree Oil", "Witch Hazel", "Zinc Oxide"],
    primary_benefits: ["Reduces excess oil", "Clears congestion", "Minimizes appearance of pores"],
    link: "https://baremineralsco.com",
    url: "https://baremineralsco.com/products/clarifying-clay-mask",
    certifications: ["Non-Comedogenic", "Oil-Free"],
    business_tags: ["Clean Beauty", "Women-Owned"]
  },
  {
    id: "sb16",
    title: "Skin-Clearing Serum",
    description: "Lightweight serum that targets breakouts and prevents new ones",
    price: "$36",
    category: "products for acne",
    brand: "Nova Derma",
    business_size: "<15 employees",
    target_demographic: "Acne-prone skin of all ages",
    key_ingredients: ["Salicylic Acid", "Niacinamide", "Zinc", "Licorice Root Extract"],
    primary_benefits: ["Reduces inflammation", "Unclogs pores", "Balances oil production"],
    link: "https://novaderma.com",
    url: "https://novaderma.com/products/skin-clearing-serum",
    certifications: ["Dermatologist Tested", "Non-Comedogenic"],
    business_tags: ["Clean Beauty", "BIPOC-Owned"]
  },
  
  // Vegan Beauty
  {
    id: "sb17",
    title: "Plant-Based Mascara",
    description: "Volumizing mascara made with plant-based ingredients",
    price: "$24",
    category: "vegan beauty",
    brand: "Green Glamour",
    business_size: "<15 employees",
    target_demographic: "All skin types, especially those seeking vegan options",
    key_ingredients: ["Plant Waxes", "Rice Protein", "Vitamin E", "Castor Oil"],
    primary_benefits: ["Lengthens lashes", "Volumizes", "Doesn't smudge or flake"],
    link: "https://greenglamourbeauty.com",
    url: "https://greenglamourbeauty.com/products/plant-based-mascara",
    certifications: ["Vegan", "Cruelty-Free", "Gluten-Free"],
    business_tags: ["Women-Owned", "Clean Beauty"]
  },
  {
    id: "sb18",
    title: "Berry Lip Tint",
    description: "Sheer, buildable lip tint made from fruit extracts",
    price: "$18",
    category: "vegan beauty",
    brand: "Fruit Pigment",
    business_size: "<20 employees",
    target_demographic: "All skin types, especially those seeking natural ingredients",
    key_ingredients: ["Blackberry Extract", "Cranberry Seed Oil", "Shea Butter", "Vitamin E"],
    primary_benefits: ["Natural flush of color", "Hydrates lips", "Buildable intensity"],
    link: "https://fruitpigment.co",
    url: "https://fruitpigment.co/products/berry-lip-tint",
    certifications: ["Vegan", "Food-Grade Ingredients"],
    business_tags: ["Sustainable", "Clean Beauty"]
  },
  
  // Eco-friendly Beauty
  {
    id: "sb19",
    title: "Zero-Waste Deodorant",
    description: "Effective natural deodorant in plastic-free paper packaging",
    price: "$16",
    category: "eco-friendly beauty",
    brand: "Earth Balance",
    business_size: "<10 employees",
    target_demographic: "All skin types, especially those seeking eco-friendly options",
    key_ingredients: ["Baking Soda", "Coconut Oil", "Arrowroot Powder", "Essential Oils"],
    primary_benefits: ["Neutralizes odor", "Absorbs moisture", "Zero plastic waste"],
    link: "https://earthbalancebeauty.com",
    url: "https://earthbalancebeauty.com/products/zero-waste-deodorant",
    certifications: ["Plastic-Free", "Biodegradable Packaging"],
    business_tags: ["Zero-Waste", "Eco-Friendly"]
  },
  {
    id: "sb20",
    title: "Shampoo Bar",
    description: "Concentrated shampoo bar equivalent to 3 bottles of liquid shampoo",
    price: "$14",
    category: "eco-friendly beauty",
    brand: "Wash Cycle",
    business_size: "<5 employees",
    target_demographic: "All hair types, especially those seeking sustainable options",
    key_ingredients: ["Coconut Oil", "Shea Butter", "Essential Oils", "Rice Protein"],
    primary_benefits: ["Gently cleanses", "Reduces plastic waste", "Travel-friendly"],
    link: "https://washcyclebeauty.com",
    url: "https://washcyclebeauty.com/products/shampoo-bar",
    certifications: ["Plastic-Free", "Palm Oil-Free", "Vegan"],
    business_tags: ["Zero-Waste", "Sustainable"]
  },
  
  // Additional skincare products
  {
    id: "sb21",
    title: "Bakuchiol Night Serum",
    description: "Plant-based retinol alternative for sensitive skin",
    price: "$52",
    category: "skincare",
    brand: "Herbivore Botanicals",
    business_size: "<100 employees",
    target_demographic: "Sensitive skin looking for anti-aging benefits",
    key_ingredients: ["Bakuchiol", "Tremella Mushroom", "Elderberry", "Echinacea"],
    primary_benefits: ["Reduces fine lines", "Improves skin texture", "Gentle on sensitive skin"],
    link: "https://www.herbivorebotanicals.com",
    url: "https://www.herbivorebotanicals.com/products/bakuchiol-retinol-alternative-serum",
    certifications: ["Cruelty-Free", "Vegan", "Clean Beauty"],
    business_tags: ["Women-Owned", "Sustainable"]
  },
  {
    id: "sb22",
    title: "Manuka Honey Mask",
    description: "Antibacterial and hydrating face mask with raw manuka honey",
    price: "$34",
    category: "skincare",
    brand: "Activist Skincare",
    business_size: "<15 employees",
    target_demographic: "Dry, irritated, or acne-prone skin",
    key_ingredients: ["Raw Manuka Honey", "Kaolin Clay", "Propolis", "Royal Jelly"],
    primary_benefits: ["Intense hydration", "Antibacterial", "Calms irritation"],
    link: "https://activistmanuka.com",
    url: "https://activistmanuka.com/collections/skincare/products/raw-manuka-honey-mask",
    certifications: ["Raw", "Wildcrafted", "Organic"],
    business_tags: ["Sustainable", "Family-Owned"]
  },
  {
    id: "sb23",
    title: "Rice Water Toner",
    description: "Brightening and hydrating toner based on traditional Asian skincare",
    price: "$28",
    category: "skincare",
    brand: "Cocokind",
    business_size: "<50 employees",
    target_demographic: "All skin types, especially dull or uneven skin",
    key_ingredients: ["Fermented Rice Water", "Sake Extract", "Licorice Root", "Niacinamide"],
    primary_benefits: ["Brightens skin tone", "Hydrates", "Balances pH"],
    link: "https://www.cocokind.com",
    url: "https://www.cocokind.com/products/rice-water-toner",
    certifications: ["Cruelty-Free", "Vegan"],
    business_tags: ["BIPOC-Owned", "Women-Owned"]
  },
  {
    id: "sb24",
    title: "Watermelon Pink Juice Moisturizer",
    description: "Lightweight oil-free moisturizer for combination skin",
    price: "$39",
    category: "skincare",
    brand: "Glow Recipe",
    business_size: "<75 employees",
    target_demographic: "Combination to oily skin types",
    key_ingredients: ["Watermelon Extract", "Hyaluronic Acid", "Antioxidants", "Vitamin C"],
    primary_benefits: ["Hydrates without heaviness", "Soothes irritation", "Improves texture"],
    link: "https://www.glowrecipe.com",
    url: "https://www.glowrecipe.com/products/watermelon-pink-juice-oil-free-moisturizer",
    certifications: ["Cruelty-Free", "Clean at Sephora"],
    business_tags: ["AAPI-Owned", "Women-Owned"]
  },
  {
    id: "sb25",
    title: "Ginseng Vitamin C Serum",
    description: "Brightening and firming serum with stabilized vitamin C",
    price: "$48",
    category: "skincare",
    brand: "Sweet Chef",
    business_size: "<25 employees",
    target_demographic: "All skin types, especially mature skin",
    key_ingredients: ["15% Vitamin C", "Ginseng Extract", "Turmeric", "Niacinamide"],
    primary_benefits: ["Firms skin", "Reduces dark spots", "Antioxidant protection"],
    link: "https://www.sweetchefskincare.com",
    url: "https://www.sweetchefskincare.com/products/ginseng-vitamin-c-serum-shot",
    certifications: ["Cruelty-Free", "Vegan"],
    business_tags: ["AAPI-Owned", "Women-Owned"]
  },
  
  // Makeup Products
  {
    id: "sb26",
    title: "Mineral Foundation",
    description: "Buildable powder foundation with SPF 20",
    price: "$30",
    category: "makeup",
    brand: "Alima Pure",
    business_size: "<30 employees",
    target_demographic: "All skin types, especially sensitive skin",
    key_ingredients: ["Mica", "Titanium Dioxide", "Iron Oxides", "Zinc Oxide"],
    primary_benefits: ["Natural coverage", "Sun protection", "Non-comedogenic"],
    link: "https://www.alimapure.com",
    url: "https://www.alimapure.com/collections/face/products/satin-matte-foundation",
    certifications: ["BDIH Certified Natural", "Cruelty-Free", "Carbon Neutral"],
    business_tags: ["Women-Owned", "Sustainable"]
  },
  {
    id: "sb27",
    title: "Cream Blush Stick",
    description: "Multi-use color stick for cheeks and lips",
    price: "$24",
    category: "makeup",
    brand: "Axiology",
    business_size: "<15 employees",
    target_demographic: "All skin types, especially those seeking clean beauty",
    key_ingredients: ["Organic Oils", "Shea Butter", "Elderberry Extract", "Vitamin E"],
    primary_benefits: ["Natural flush", "Hydrating formula", "Versatile use"],
    link: "https://axiologybeauty.com",
    url: "https://axiologybeauty.com/collections/multi-use/products/lip-to-lid-balmie-in-strawberry",
    certifications: ["Vegan", "Palm Oil-Free", "Cruelty-Free"],
    business_tags: ["Women-Owned", "Zero-Waste"]
  },
  {
    id: "sb28",
    title: "Clean Mascara",
    description: "Lengthening mascara made with clean ingredients",
    price: "$26",
    category: "makeup",
    brand: "Lily Lolo",
    business_size: "<40 employees",
    target_demographic: "All skin types, especially those with sensitive eyes",
    key_ingredients: ["Organic Beeswax", "Arginine", "Vitamin E", "Chamomile Extract"],
    primary_benefits: ["Lengthens lashes", "Doesn't clump", "No flaking"],
    link: "https://www.lilylolo.us",
    url: "https://www.lilylolo.us/eyes/mascara/natural-mascara.html",
    certifications: ["Gluten-Free", "Cruelty-Free"],
    business_tags: ["Women-Owned", "Clean Beauty"]
  },
  {
    id: "sb29",
    title: "Liquid Eyeliner",
    description: "Precision liquid liner with staying power",
    price: "$22",
    category: "makeup",
    brand: "Zuzu Luxe",
    business_size: "<50 employees",
    target_demographic: "All skin types, especially those with sensitive eyes",
    key_ingredients: ["Organic Aloe", "Chamomile", "Vitamin C", "Natural Minerals"],
    primary_benefits: ["Precise application", "Smudge-proof", "Non-irritating"],
    link: "https://gabrielcosmeticsinc.com",
    url: "https://gabrielcosmeticsinc.com/collections/zuzu-luxe/products/liquid-eyeliner",
    certifications: ["Vegan", "Gluten-Free", "Cruelty-Free"],
    business_tags: ["Clean Beauty", "Sustainable"]
  },
  {
    id: "sb30",
    title: "Tinted Lip Balm",
    description: "Hydrating lip balm with natural color",
    price: "$18",
    category: "makeup",
    brand: "Olio E Osso",
    business_size: "<15 employees",
    target_demographic: "All skin types, especially dry or chapped lips",
    key_ingredients: ["Olive Oil", "Shea Butter", "Beeswax", "Natural Pigments"],
    primary_benefits: ["Hydrates lips", "Subtle color", "Multipurpose use"],
    link: "https://olioeosse.com",
    url: "https://olioeosse.com/collections/balms/products/no-2-french-melon",
    certifications: ["Handcrafted", "Cruelty-Free"],
    business_tags: ["Women-Owned", "Made in USA"]
  },
  
  // Haircare Products
  {
    id: "sb31",
    title: "Clarifying Shampoo",
    description: "Deep cleansing shampoo that removes buildup",
    price: "$28",
    category: "haircare",
    brand: "Innersense Organic Beauty",
    business_size: "<50 employees",
    target_demographic: "All hair types, especially those with product buildup",
    key_ingredients: ["Apple Cider Vinegar", "Eucalyptus", "Witch Hazel", "Peppermint"],
    primary_benefits: ["Removes residue", "Balances scalp", "Adds shine"],
    link: "https://innersensebeauty.com",
    url: "https://innersensebeauty.com/product/detox-hair-mask/",
    certifications: ["Organic", "Cruelty-Free", "B Corp"],
    business_tags: ["Women-Owned", "Clean Beauty"]
  },
  {
    id: "sb32",
    title: "Curl Define Cream",
    description: "Moisturizing curl cream for definition and hold",
    price: "$32",
    category: "haircare",
    brand: "Briogeo",
    business_size: "<100 employees",
    target_demographic: "Curly, coily, and wavy hair types",
    key_ingredients: ["Shea Butter", "Aloe", "Rice Amino Acids", "Avocado Oil"],
    primary_benefits: ["Defines curls", "Reduces frizz", "Adds moisture"],
    link: "https://briogeohair.com",
    url: "https://briogeohair.com/products/curl-charisma-rice-amino-avocado-leave-in-defining-creme",
    certifications: ["Cruelty-Free", "Vegan"],
    business_tags: ["BIPOC-Owned", "Women-Owned"]
  },
  
  // Sustainable Beauty
  {
    id: "sb33",
    title: "Refillable Lipstick",
    description: "Moisturizing lipstick in a refillable metal case",
    price: "$28 (case) / $18 (refill)",
    category: "sustainable beauty",
    brand: "Kjaer Weis",
    business_size: "<50 employees",
    target_demographic: "All skin types, especially eco-conscious consumers",
    key_ingredients: ["Organic Seed Oils", "Shea Butter", "Jojoba Oil", "Carnauba Wax"],
    primary_benefits: ["Long-wearing color", "Hydrating formula", "Reduces packaging waste"],
    link: "https://kjaerweis.com",
    url: "https://kjaerweis.com/products/lipstick",
    certifications: ["Certified Organic", "Cruelty-Free"],
    business_tags: ["Sustainable", "Luxury Clean Beauty"]
  },
  {
    id: "sb34",
    title: "Zero Waste Eyeshadow Palette",
    description: "Pressed powder eyeshadow in plastic-free packaging",
    price: "$42",
    category: "sustainable beauty",
    brand: "Aether Beauty",
    business_size: "<25 employees",
    target_demographic: "All skin types, especially eco-conscious consumers",
    key_ingredients: ["Rose Hip Oil", "Organic Shea Butter", "Vitamin E", "Mineral Pigments"],
    primary_benefits: ["Highly pigmented", "Recyclable packaging", "Long-wearing"],
    link: "https://aetherbeautyco.com",
    url: "https://aetherbeautyco.com/collections/eyeshadow/products/joshua-tree-palette",
    certifications: ["Cruelty-Free", "Vegan", "Leaping Bunny"],
    business_tags: ["Women-Owned", "Zero-Waste"]
  },
  
  // College Products
  {
    id: "sb35",
    title: "Caffeine Eye Cream",
    description: "Depuffing eye cream for late study nights",
    price: "$18",
    category: "products for college kids",
    brand: "The INKEY List",
    business_size: "<100 employees",
    target_demographic: "Young adults with busy lifestyles",
    key_ingredients: ["Caffeine", "Matrixyl 3000", "Hyaluronic Acid", "Peptides"],
    primary_benefits: ["Reduces puffiness", "Minimizes dark circles", "Hydrates"],
    link: "https://www.theinkeylist.com",
    url: "https://www.theinkeylist.com/products/caffeine-eye-cream",
    certifications: ["Cruelty-Free", "Fragrance-Free"],
    business_tags: ["Clean Beauty", "Affordable"]
  },
  {
    id: "sb36",
    title: "Hydrating Face Mist",
    description: "Refreshing spray to hydrate skin throughout the day",
    price: "$16",
    category: "products for college kids",
    brand: "Heritage Store",
    business_size: "<100 employees",
    target_demographic: "Students with busy schedules",
    key_ingredients: ["Rosewater", "Hyaluronic Acid", "Glycerin", "Aloe Vera"],
    primary_benefits: ["Quick hydration", "Refreshes makeup", "Soothes skin"],
    link: "https://heritagestore.com",
    url: "https://heritagestore.com/collections/facial-mists/products/rosewater-facial-spray",
    certifications: ["Cruelty-Free", "Vegan"],
    business_tags: ["Clean Beauty", "Made in USA"]
  },
  
  // Products for Acne
  {
    id: "sb37",
    title: "Salicylic Acid Serum",
    description: "Targeted treatment for acne-prone skin",
    price: "$28",
    category: "products for acne",
    brand: "Paula's Choice",
    business_size: "<200 employees",
    target_demographic: "Acne-prone skin types",
    key_ingredients: ["2% Salicylic Acid", "Green Tea", "Allantoin", "Hyaluronic Acid"],
    primary_benefits: ["Unclogs pores", "Reduces inflammation", "Prevents breakouts"],
    link: "https://www.paulaschoice.com",
    url: "https://www.paulaschoice.com/skin-perfecting-2pct-bha-liquid-exfoliant/201.html",
    certifications: ["Cruelty-Free", "Fragrance-Free", "Non-Irritating"],
    business_tags: ["Women-Owned", "Research-Based"]
  },
  {
    id: "sb38",
    title: "Pimple Patches",
    description: "Hydrocolloid patches that draw out impurities",
    price: "$14",
    category: "products for acne",
    brand: "Hero Cosmetics",
    business_size: "<50 employees",
    target_demographic: "All skin types with occasional breakouts",
    key_ingredients: ["Hydrocolloid", "Medical-Grade Adhesive"],
    primary_benefits: ["Absorbs fluid", "Reduces inflammation", "Protects from bacteria"],
    link: "https://www.herocosmetics.com",
    url: "https://www.herocosmetics.com/products/mighty-patch-original",
    certifications: ["Cruelty-Free", "Vegan"],
    business_tags: ["Women-Owned", "Clean Beauty"]
  }
];
