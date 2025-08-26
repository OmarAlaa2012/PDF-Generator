import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { BookEntry } from '../types/book';

interface PDFDocumentProps {
  entries: BookEntry[];
  titleSize: number;
}

// Create styles that match the preview exactly
const createStyles = (titleSize: number) => StyleSheet.create({
  page: {
    backgroundColor: '#0f172a', // slate-900
    padding: 32,
    fontFamily: 'Courier',
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  backgroundTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
  },
  header: {
    color: 'white',
    fontSize: titleSize,
    marginBottom: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  cardContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)', // slate-800/90 with backdrop blur effect
    padding: 32,
    borderRadius: 12,
    border: '1px solid #334155', // slate-700
    position: 'relative',
    width: '100%',
    maxWidth: 512, // max-w-lg equivalent
    height: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
  },
  trafficLights: {
    position: 'absolute',
    top: 24,
    left: 24,
    flexDirection: 'row',
  },
  trafficLight: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  redLight: {
    backgroundColor: '#ef4444', // red-500
  },
  yellowLight: {
    backgroundColor: '#eab308', // yellow-500
  },
  greenLight: {
    backgroundColor: '#22c55e', // green-500
  },
  errorCodeBadge: {
    position: 'absolute',
    top: 24,
    right: 24,
    color: '#94a3b8', // slate-400
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
  contentContainer: {
    paddingTop: 16,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    color: '#10b981', // emerald-400
    fontWeight: 'bold',
    fontFamily: 'Courier',
    fontSize: 12,
    marginRight: 8,
  },
  value: {
    color: 'white',
    flex: 1,
    lineHeight: 1.5,
    fontSize: 12,
    fontFamily: 'Courier',
  },
  detailsValue: {
    color: 'white',
    flex: 1,
    lineHeight: 1.6, // leading-relaxed
    fontSize: 12,
    fontFamily: 'Courier',
    marginTop: 4,
  },
  pageNumber: {
    textAlign: 'center',
    marginTop: 32,
    color: '#64748b', // slate-500
    fontSize: 14,
    fontFamily: 'Courier',
  },
});

// PDF Document Component
const PDFDocument = ({ entries, titleSize }: PDFDocumentProps) => {
  const styles = createStyles(titleSize);
  
  return (
    <Document>
      {entries.map((entry, index) => (
        <Page key={index} size="A4" style={styles.page}>
          {/* Background texture effect */}
          <View style={styles.backgroundTexture} />
          
          {/* Header */}
          <Text style={styles.header}>HTTP Errors</Text>
          
          {/* Card Container */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              {/* Traffic Light Indicators */}
              <View style={styles.trafficLights}>
                <View style={[styles.trafficLight, styles.redLight]} />
                <View style={[styles.trafficLight, styles.yellowLight]} />
                <View style={[styles.trafficLight, styles.greenLight]} />
              </View>
              
              {/* Error Code Badge */}
              <Text style={styles.errorCodeBadge}>{entry.errorCode}</Text>
              
              {/* Content */}
              <View style={styles.contentContainer}>
                <View style={styles.row}>
                  <Text style={styles.label}>Error Code:</Text>
                  <Text style={styles.value}>{entry.errorCode}</Text>
                </View>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Category:</Text>
                  <Text style={styles.value}>{entry.category}</Text>
                </View>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Meaning:</Text>
                  <Text style={styles.value}>{entry.meaning}</Text>
                </View>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Details:</Text>
                  <Text style={styles.detailsValue}>{entry.details}</Text>
                </View>
                
                <View style={styles.row}>
                  <Text style={styles.label}>Fix:</Text>
                  <Text style={styles.detailsValue}>{entry.fix}</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Page Number */}
          <Text style={styles.pageNumber}>Page {index + 1}</Text>
        </Page>
      ))}
    </Document>
  );
};

export const generatePDF = async (entries: BookEntry[], titleSize: number = 24) => {
  const blob = await pdf(<PDFDocument entries={entries} titleSize={titleSize} />).toBlob();
  return blob;
};

export const downloadPDF = async (
  entries: BookEntry[], 
  filename = 'http-errors-reference.pdf',
  titleSize: number = 24
) => {
  const blob = await generatePDF(entries, titleSize);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};