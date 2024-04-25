import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import * as Icons from "@mui/icons-material"; // Importer tous les icônes disponibles

const IconPicker = ({ open, onClose, onSelect }) => {
  // Récupérer tous les noms d'icônes à partir de Icons
  const iconNames = Object.keys(Icons).filter((iconName) =>
    iconName.includes("Outlined")
  );

  return (
    <main className="p-12">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Choisir une icône</DialogTitle>
        <DialogContent>
          <List>
            {iconNames.map((iconName) => {
              const IconComponent = Icons[iconName]; // Récupérer le composant d'icône correspondant
              return (
                <ListItem
                  button
                  key={iconName}
                  onClick={() => onSelect(iconName)}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText primary={iconName} />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default IconPicker;
