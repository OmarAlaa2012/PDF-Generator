import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { BookEntry } from '../types/book';

// Register fonts to match the preview exactly
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2',
      fontWeight: 'bold',
    },
  ],
});

interface PDFDocumentProps {
  entries: BookEntry[];
  titleSize: number;
  pageSize: { width: number; height: number };
}

// Create styles that match the preview exactly
const createStyles = (titleSize: number, pageSize: { width: number; height: number }) => StyleSheet.create({
  page: {
    backgroundColor: '#0f172a', // slate-900
    padding: 32,
    fontFamily: 'Inter', // Match the web font
    position: 'relative',
    width: pageSize.width,
    height: pageSize.height,
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
    letterSpacing: 1.5, // tracking-wider
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  cardContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)', // slate-800/90
    padding: 32,
    borderRadius: 12,
    border: '1px solid #334155', // slate-700
    position: 'relative',
    width: 512, // max-w-lg
    height: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    fontFamily: 'Inter',
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
    flexDirection: 'column',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    color: '#10b981', // emerald-400
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fontSize: 14,
    marginRight: 8,
  },
  value: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter',
    marginLeft: 8,
  },
  detailsContainer: {
    marginTop: 4,
    marginLeft: 2,
  },
  detailsValue: {
    color: 'white',
    lineHeight: 1.6, // leading-relaxed
    fontSize: 14,
    fontFamily: 'Inter',
  },
  pageNumber: {
    textAlign: 'center',
    marginTop: 32,
    color: '#64748b', // slate-500
    fontSize: 14,
    fontFamily: 'Inter',
  },
});

// PDF Document Component
const PDFDocument = ({ entries, titleSize, pageSize }: PDFDocumentProps) => {
  const styles = createStyles(titleSize, pageSize);
  
  return (
    <Document>
      {entries.map((entry, index) => (
        <Page key={index} size={[pageSize.width, pageSize.height]} style={styles.page}>
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
                  <View style={styles.rowHeader}>
                    <Text style={styles.label}>Error Code:</Text>
                    <Text style={styles.value}>{entry.errorCode}</Text>
                  </View>
                </View>
                
                <View style={styles.row}>
                  <View style={styles.rowHeader}>
                    <Text style={styles.label}>Category:</Text>
                    <Text style={styles.value}>{entry.category}</Text>
                  </View>
                </View>
                
                <View style={styles.row}>
                  <View style={styles.rowHeader}>
                    <Text style={styles.label}>Meaning:</Text>
                    <Text style={styles.value}>{entry.meaning}</Text>
                  </View>
                </View>
                
                <View style={styles.row}>
                  <View style={styles.rowHeader}>
                    <Text style={styles.label}>Details:</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsValue}>{entry.details}</Text>
                  </View>
                </View>
                
                <View style={styles.row}>
                  <View style={styles.rowHeader}>
                    <Text style={styles.label}>Fix:</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsValue}>{entry.fix}</Text>
                  </View>
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

export const generatePDF = async (
  entries: BookEntry[], 
  titleSize: number = 24,
  pageSize: { width: number; height: number }
) => {
  const blob = await pdf(<PDFDocument entries={entries} titleSize={titleSize} pageSize={pageSize} />).toBlob();
  return blob;
};

export const downloadPDF = async (
  entries: BookEntry[], 
  filename = 'http-errors-reference.pdf',
  titleSize: number = 24,
  pageSize: { width: number; height: number }
) => {
  const blob = await generatePDF(entries, titleSize, pageSize);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};