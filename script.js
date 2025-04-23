// script.js
// Uses global 'components' variable defined in components.js

// Initialize calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Ensure components is defined
  if (typeof components === 'undefined') {
    console.error('components.js not loaded or components variable not defined');
    const output = document.getElementById('combinations');
    if (output) {
      output.innerHTML = '<p>Error: Components data not loaded. Please check components.js.</p>';
    }
    return;
  }

  // Load saved state from localStorage
  loadState();
});

// Load saved state from localStorage
function loadState() {
  const savedState = localStorage.getItem('grimDawnCalculatorState');
  if (savedState) {
    try {
      const state = JSON.parse(savedState);

      // Restore character level
      const charLevelInput = document.getElementById('charLevel');
      if (charLevelInput && state.charLevel) {
        charLevelInput.value = state.charLevel;
      }

      // Restore template
      const templateInput = document.getElementById('template');
      if (templateInput && state.template) {
        templateInput.value = state.template;
      }

      // Restore resistances
      const resistanceInputs = {
        fire: document.getElementById('fire'),
        cold: document.getElementById('cold'),
        lightning: document.getElementById('lightning'),
        poison: document.getElementById('poison'),
        piercing: document.getElementById('piercing'),
        bleeding: document.getElementById('bleeding'),
        vitality: document.getElementById('vitality'),
        aether: document.getElementById('aether'),
        chaos: document.getElementById('chaos')
      };
      for (const res in state.resistances) {
        if (resistanceInputs[res] && state.resistances[res] !== undefined) {
          resistanceInputs[res].value = state.resistances[res];
        }
      }

      // Restore locked locations
      const lockInputs = {
        head: document.getElementById('lock-head'),
        chest: document.getElementById('lock-chest'),
        shoulder: document.getElementById('lock-shoulder'),
        legs: document.getElementById('lock-legs'),
        foot: document.getElementById('lock-foot'),
        hand: document.getElementById('lock-hand'),
        belt: document.getElementById('lock-belt'),
        amulet: document.getElementById('lock-amulet'),
        medal: document.getElementById('lock-medal'),
        ring1: document.getElementById('lock-ring1'),
        ring2: document.getElementById('lock-ring2'),
        weapon: document.getElementById('lock-weapon'),
        shield: document.getElementById('lock-shield'),
        offhand: document.getElementById('lock-offhand')
      };
      for (const slot in state.locks) {
        if (lockInputs[slot] && state.locks[slot] !== undefined) {
          lockInputs[slot].checked = state.locks[slot];
        }
      }

      // Restore results
      const output = document.getElementById('combinations');
      if (output && state.results) {
        output.innerHTML = state.results;
      }

      console.log('State loaded from localStorage:', state);
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
  }
}

// Save state to localStorage
function saveState() {
  const state = {
    charLevel: document.getElementById('charLevel')?.value || '',
    template: document.getElementById('template')?.value || '',
    resistances: {
      fire: document.getElementById('fire')?.value || '',
      cold: document.getElementById('cold')?.value || '',
      lightning: document.getElementById('lightning')?.value || '',
      poison: document.getElementById('poison')?.value || '',
      piercing: document.getElementById('piercing')?.value || '',
      bleeding: document.getElementById('bleeding')?.value || '',
      vitality: document.getElementById('vitality')?.value || '',
      aether: document.getElementById('aether')?.value || '',
      chaos: document.getElementById('chaos')?.value || ''
    },
    locks: {
      head: document.getElementById('lock-head')?.checked || false,
      chest: document.getElementById('lock-chest')?.checked || false,
      shoulder: document.getElementById('lock-shoulder')?.checked || false,
      legs: document.getElementById('lock-legs')?.checked || false,
      foot: document.getElementById('lock-foot')?.checked || false,
      hand: document.getElementById('lock-hand')?.checked || false,
      belt: document.getElementById('lock-belt')?.checked || false,
      amulet: document.getElementById('lock-amulet')?.checked || false,
      medal: document.getElementById('lock-medal')?.checked || false,
      ring1: document.getElementById('lock-ring1')?.checked || false,
      ring2: document.getElementById('lock-ring2')?.checked || false,
      weapon: document.getElementById('lock-weapon')?.checked || false,
      shield: document.getElementById('lock-shield')?.checked || false,
      offhand: document.getElementById('lock-offhand')?.checked || false
    },
    results: document.getElementById('combinations')?.innerHTML || ''
  };

  try {
    localStorage.setItem('grimDawnCalculatorState', JSON.stringify(state));
    console.log('State saved to localStorage:', state);
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// Main calculation function
function calculateCombinations() {
  // Get input elements
  const charLevelInput = document.getElementById('charLevel');
  const resistanceInputs = {
    fire: document.getElementById('fire'),
    cold: document.getElementById('cold'),
    lightning: document.getElementById('lightning'),
    poison: document.getElementById('poison'),
    piercing: document.getElementById('piercing'),
    bleeding: document.getElementById('bleeding'),
    vitality: document.getElementById('vitality'),
    aether: document.getElementById('aether'),
    chaos: document.getElementById('chaos')
  };
  const templateInput = document.getElementById('template');

  // Validate inputs
  const output = document.getElementById('combinations');
  if (!charLevelInput || Object.values(resistanceInputs).some(input => !input) || !templateInput) {
    console.error('One or more input elements not found');
    if (output) {
      output.innerHTML = '<p>Error: Please ensure all input fields, including template, are present in the form.</p>';
    }
    return;
  }

  // Get input values
  const charLevel = parseInt(charLevelInput.value) || 1;
  const resistances = {
    fire: parseInt(resistanceInputs.fire.value) || 0,
    cold: parseInt(resistanceInputs.cold.value) || 0,
    lightning: parseInt(resistanceInputs.lightning.value) || 0,
    poison: parseInt(resistanceInputs.poison.value) || 0,
    piercing: parseInt(resistanceInputs.piercing.value) || 0,
    bleeding: parseInt(resistanceInputs.bleeding.value) || 0,
    vitality: parseInt(resistanceInputs.vitality.value) || 0,
    aether: parseInt(resistanceInputs.aether.value) || 0,
    chaos: parseInt(resistanceInputs.chaos.value) || 0
  };
  const template = templateInput.value || 'one-hand-shield'; // Default to one-hand + shield

  // Get locked slots
  const lockInputs = {
    head: document.getElementById('lock-head'),
    chest: document.getElementById('lock-chest'),
    shoulder: document.getElementById('lock-shoulder'),
    legs: document.getElementById('lock-legs'),
    foot: document.getElementById('lock-foot'),
    hand: document.getElementById('lock-hand'),
    belt: document.getElementById('lock-belt'),
    amulet: document.getElementById('lock-amulet'),
    medal: document.getElementById('lock-medal'),
    ring1: document.getElementById('lock-ring1'),
    ring2: document.getElementById('lock-ring2'),
    weapon: document.getElementById('lock-weapon'),
    shield: document.getElementById('lock-shield'),
    offhand: document.getElementById('lock-offhand')
  };

  // Define available slots, excluding locked ones and template-restricted slots
  let availableSlots = [
    'head', 'chest', 'shoulder', 'legs', 'foot', 'hand', 'belt',
    'amulet', 'medal', 'ring1', 'ring2', 'weapon', 'shield', 'offhand'
  ].filter(slot => !lockInputs[slot] || !lockInputs[slot].checked);

  // Apply template restrictions
  if (template === 'one-hand-shield') {
    availableSlots = availableSlots.filter(slot => slot !== 'offhand');
  } else if (template === 'one-hand-offhand') {
    availableSlots = availableSlots.filter(slot => slot !== 'shield');
  } else if (template === 'two-hand') {
    availableSlots = availableSlots.filter(slot => slot !== 'shield' && slot !== 'offhand');
  } else {
    console.warn('Invalid template selected, defaulting to one-hand-shield');
    availableSlots = availableSlots.filter(slot => slot !== 'offhand');
  }

  console.log('Selected template:', template);
  console.log('Available slots:', availableSlots);

  // Calculate missing resistances (80% cap)
  const missingResistances = {};
  for (const res in resistances) {
    missingResistances[res] = Math.max(0, 80 - resistances[res]);
  }

  console.log('Initial missing resistances:', missingResistances);

  // Filter components by character level
  const validComponents = components.filter(comp => comp.minLevel <= charLevel);

  // Count compatible components per slot
  const slotComponentCounts = {};
  availableSlots.forEach(slot => {
    slotComponentCounts[slot] = 0;
  });

  validComponents.forEach(comp => {
    let contributes = false;
    for (const res in comp.resistances) {
      if (res === 'elemental') {
        if (missingResistances.fire > 0 || missingResistances.cold > 0 || missingResistances.lightning > 0) {
          contributes = true;
        }
      } else if (missingResistances[res] > 0) {
        contributes = true;
      }
    }
    if (contributes) {
      comp.locations.forEach(slot => {
        const targetSlot = slot === 'ring' ? 'ring1' : slot;
        if (availableSlots.includes(targetSlot)) {
          slotComponentCounts[targetSlot]++;
        }
        if (slot === 'ring' && availableSlots.includes('ring2')) {
          slotComponentCounts['ring2']++;
        }
      });
    }
  });

  console.log('Slot component counts:', slotComponentCounts);

  // Iterative component selection
  const selectedComponents = [];
  const usedSlots = new Set();
  const finalResistances = { ...resistances };

  let iteration = 0;
  while (availableSlots.length > 0) {
    iteration++;
    console.log(`Iteration ${iteration}: Available slots:`, availableSlots);
    console.log(`Iteration ${iteration}: Current missing resistances:`, missingResistances);

    // Calculate priority score for each component
    const componentsWithPriority = validComponents.map(comp => {
      let priorityScore = 0;
      let totalResistances = 0;
      let provided = 0;
      const scoreBreakdown = {}; // Track contributions

      // Calculate totalResistances (all resistances, elemental x3)
      for (const res in comp.resistances) {
        if (res === 'elemental') {
          totalResistances += comp.resistances[res] * 3; // Counts for fire, cold, lightning
        } else {
          totalResistances += comp.resistances[res];
        }
      }

      // Calculate provided (sum of needed resistances)
      for (const res in comp.resistances) {
        if (res === 'elemental') {
          const elementalResistances = ['fire', 'cold', 'lightning'];
          elementalResistances.forEach(elemRes => {
            const needed = missingResistances[elemRes];
            const resProvided = Math.min(needed, comp.resistances[res]);
            provided += resProvided;
            scoreBreakdown[elemRes] = { needed, provided: resProvided };
          });
        } else {
          const needed = missingResistances[res];
          const resProvided = Math.min(needed, comp.resistances[res]);
          provided += resProvided;
          scoreBreakdown[res] = { needed, provided: resProvided };
        }
      }

      // Calculate priorityScore
      if (provided > 0) {
        priorityScore = provided * (1 - 1 / totalResistances);
        scoreBreakdown.score = { provided, totalResistances, priorityScore };
      } else {
        scoreBreakdown.score = { provided, totalResistances, priorityScore: 0 };
      }

      const validLocations = comp.locations.filter(slot => {
        const targetSlot = slot === 'ring' ? (usedSlots.has('ring1') ? 'ring2' : 'ring1') : slot;
        return availableSlots.includes(targetSlot);
      });

      // Calculate the minimum component count for tiebreaker
      let minComponentCount = Infinity;
      validLocations.forEach(slot => {
        const targetSlot = slot === 'ring' ? (usedSlots.has('ring1') ? 'ring2' : 'ring1') : slot;
        if (availableSlots.includes(targetSlot)) {
          minComponentCount = Math.min(minComponentCount, slotComponentCounts[targetSlot] || 0);
        }
      });

      return { ...comp, priorityScore, validLocations, scoreBreakdown, minComponentCount, totalResistances };
    });

    // Filter out components with zero priority or no valid locations
    const contributingComponents = componentsWithPriority.filter(
      comp => comp.priorityScore > 0 && comp.validLocations.length > 0
    );

    console.log(`Iteration ${iteration}: Contributing components:`, contributingComponents.map(c => ({
      name: c.name,
      priorityScore: c.priorityScore,
      totalResistances: c.totalResistances,
      validLocations: c.validLocations,
      minComponentCount: c.minComponentCount,
      scoreBreakdown: c.scoreBreakdown
    })));

    if (contributingComponents.length === 0) {
      console.log(`Iteration ${iteration}: No more contributing components`);
      break;
    }

    // Sort by priority score, then by min component count for the best slot
    contributingComponents.sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return a.minComponentCount - b.minComponentCount; // Lower minComponentCount wins
    });

    // Select the best component
    const bestComponent = contributingComponents[0];

    // Log priority scores for key components
    console.log(`Iteration ${iteration}: Top component: ${bestComponent.name} (Score: ${bestComponent.priorityScore}, Total Resistances: ${bestComponent.totalResistances}, Min Component Count: ${bestComponent.minComponentCount})`);
    ['Antivenom Salve', 'Titan Plating', 'Sacred Plating', 'Imbued Silver', 'Ugdenbog Leather'].forEach(name => {
      const comp = componentsWithPriority.find(c => c.name === name);
      if (comp) {
        console.log(`Iteration ${iteration}: ${name} Score: ${comp.priorityScore}, Total Resistances: ${comp.totalResistances}, Locations: ${comp.validLocations}, Min Component Count: ${comp.minComponentCount}, Breakdown:`, comp.scoreBreakdown);
      }
    });

    // Choose the slot with the fewest compatible components
    let chosenSlot = null;
    let minComponentCount = Infinity;

    bestComponent.validLocations.forEach(slot => {
      const targetSlot = slot === 'ring' ? (usedSlots.has('ring1') ? 'ring2' : 'ring1') : slot;
      if (availableSlots.includes(targetSlot)) {
        const componentCount = slotComponentCounts[targetSlot] || 0;
        if (componentCount < minComponentCount) {
          minComponentCount = componentCount;
          chosenSlot = targetSlot;
        }
      }
    });

    if (!chosenSlot) {
      console.log(`Iteration ${iteration}: No available slot for component: ${bestComponent.name}`);
      break;
    }

    // Assign the component
    selectedComponents.push({ ...bestComponent, assignedSlot: chosenSlot });
    usedSlots.add(chosenSlot);
    availableSlots = availableSlots.filter(slot => slot !== chosenSlot);

    console.log(`Iteration ${iteration}: Assigned: ${bestComponent.name} to ${chosenSlot}`);

    // Update missing resistances
    for (const res in bestComponent.resistances) {
      if (res === 'elemental') {
        finalResistances.fire = Math.min(80, finalResistances.fire + bestComponent.resistances[res]);
        finalResistances.cold = Math.min(80, finalResistances.cold + bestComponent.resistances[res]);
        finalResistances.lightning = Math.min(80, finalResistances.lightning + bestComponent.resistances[res]);
        missingResistances.fire = Math.max(0, 80 - finalResistances.fire);
        missingResistances.cold = Math.max(0, 80 - finalResistances.cold);
        missingResistances.lightning = Math.max(0, 80 - finalResistances.lightning);
      } else {
        finalResistances[res] = Math.min(80, finalResistances[res] + bestComponent.resistances[res]);
        missingResistances[res] = Math.max(0, 80 - finalResistances[res]);
      }
    }

    console.log(`Iteration ${iteration}: Updated missing resistances:`, missingResistances);
    console.log(`Iteration ${iteration}: Updated final resistances:`, finalResistances);

    // Check if all resistances are capped
    if (Object.values(missingResistances).every(val => val === 0)) {
      console.log(`Iteration ${iteration}: All resistances capped`);
      break;
    }
  }

  // Calculate total effective resistance
  let totalEffective = 0;
  for (const res in finalResistances) {
    totalEffective += finalResistances[res];
  }

  // Generate output
  if (output) {
    output.innerHTML = `
      <h2>Optimal Component Combination (Template: ${template})</h2>
      <p>Total Effective Resistance: ${totalEffective.toFixed(2)}%</p>
      <ul>
        ${selectedComponents.map(comp => `
          <li>
            <span class="component-name">${comp.name}</span>
            (<span class="component-location">${comp.assignedSlot}</span>):
            <span class="component-details">${Object.entries(comp.resistances)
              .map(([res, val]) => `${res}: +${val}%`)
              .join(', ')}</span>
          </li>
        `).join('')}
      </ul>
      <h3>Final Resistances</h3>
      <ul>
        ${Object.entries(finalResistances)
          .map(([res, val]) => `<li>${res}: ${val}%</li>`)
          .join('')}
      </ul>
    `;
  } else {
    console.error('Output element not found');
  }

  // Save state to localStorage
  saveState();
}
